//Custom Webpack Plugin to emit JSON files with block list urls

import { Compilation, Compiler } from 'webpack';
import path from 'path';
import fs from 'fs';

const pluginName = 'BlockListGeneratorPlugin';

class BlockListGeneratorPlugin {
    apply(compiler: Compiler) {
        compiler.hooks.afterEmit.tap(pluginName, (compilation: Compilation) => {
            const easyListTextFilePath = path.resolve(
                process.cwd(),
                'public/easyList.txt'
            );

            const textData = fs.readFileSync(easyListTextFilePath, {
                encoding: 'utf-8',
            });
            const arrayOfUrlsToBlock = textData.split('\n');

            let nonASCIIRegex = new RegExp(/^[\x00-\x7F]+$/g);
            let staticBlockRules: Object[] = [];
            arrayOfUrlsToBlock.forEach((urlString, index) => {
                if (!urlString.match(nonASCIIRegex)) {
                    //Meaning string has non-ASCII characters
                    return;
                } else {
                    let ruleId = index + 1;
                    let ruleObject = {
                        id: ruleId,
                        priority: 1,
                        action: { type: 'block' },
                        condition: {
                            urlFilter: `${urlString}`,
                            resourceTypes: [
                                'script',
                                'main_frame',
                                'sub_frame',
                            ],
                        },
                    };
                    staticBlockRules.push(ruleObject);
                }
            });

            fs.writeFileSync(
                path.resolve(process.cwd(), 'build/rules.json'),
                JSON.stringify(staticBlockRules),
                { encoding: 'utf-8' }
            );
        });
    }
}

export default BlockListGeneratorPlugin;
