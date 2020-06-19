import fs from "fs";
import path from "path";
import cheerio from "cheerio";
import htmlparser2 from "htmlparser2";
import base64Img from "base64-img";

// API: https://rollupjs.org/guide/en/#plugins-overview
// inspired from https://stackoverflow.com/a/61573774/858275
// https://cheerio.js.org/

export default function inlineSvelte(mainFile, dest, dir) {
  return {
    name: "Svelte Inliner",
    generateBundle(opts, bundle) {
      const file = path.parse(opts.file).base;
      const code = bundle[file].code;

      // read in mainFile, parse as DOM
      const main = fs.readFileSync(path.join(dir, mainFile), "utf8");
      const d = htmlparser2.parseDOM(main);
      const $ = cheerio.load(d);

      // inline all source files
      $("script[src]").each(function (index, el) {
        let scriptName = $(this).attr("src");

        $(this).attr("type", "text/javascript");

        let scriptToImport;
        if (bundle[scriptName]) {
          // reference to a bundled script

          // okay, I can't call hasOwnProperty?
          scriptToImport = bundle[scriptName].code;

          // HACK: remove 'use strict' for IE11 compatability
          scriptToImport = scriptToImport.replace(
            /[\'\"]use strict?[\"\']/i,
            ""
          );
        } else {
          // import locally referenced file
          scriptToImport = fs.readFileSync(path.join(dir, scriptName));
        }
        $(this).text(scriptToImport); // cheerio trips when calling .html() on long, minified script
        $(this).removeAttr("src");
      });

      // inline all link files
      $("link[href]").each(function (index, el) {
        let linkName = $(this).attr("href");
        let linkPath = path.join(dir, linkName);

        switch ($(this).attr("rel")) {
          case "stylesheet":
            $(el.parentNode).append(
              `<style>${fs.readFileSync(linkPath, "utf8")}</style>`
            );

            $(this).remove();
            break;
          default:
            if ($(this).attr("type").startsWith("image")) {
              $(this).attr("href", base64Img.base64Sync(linkPath));
            }

            break;
        }
      });

      let prelimHtml = $.html();

      const INLINE_REGEX = /\/\/\s+INLINE\s+([a-zA-Z0-9\.\@\-_\/]+)/g;

      let matches = [...prelimHtml.matchAll(INLINE_REGEX)];

      matches.forEach((match) => {
        let [str, file, ..._] = match;
        prelimHtml = prelimHtml.replace(
          str,
          fs.readFileSync(path.join(file), "utf8")
        );
      });

      // output file
      fs.writeFileSync(path.join(dir, dest), prelimHtml);
    },
  };
}
