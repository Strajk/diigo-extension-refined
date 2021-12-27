import { chalk, fs, globby } from 'zx';
import beautify from 'js-beautify';
import prettier from 'prettier';

console.log(chalk.cyan('Diigo Beautifier'));

const sharedOptions = {
  indent_size: 2,
}

for (const ext of ['js', 'css', 'html']) {
  const files = globby.globbySync(`./extension/**/*.${ext}`);
  for (const filepath of files) {
    console.log(chalk.cyan(`Beautifying ${filepath}`));

    const content = fs.readFileSync(filepath, 'utf8');

    let beautified;
    switch (ext) {
      case 'js':
        beautified = beautify[ext](content, {
          ...sharedOptions,
        });
        break;
      case 'css':
        beautified = beautify[ext](content, {
          ...sharedOptions,
        });
        break;
      case 'html':
        beautified = beautify[ext](content, {
          ...sharedOptions,
        });
        break;
    }

    // Sometimes, original diigo extension files contain invalid syntax, e.g. `position: fixed; !important;`
    // js-beautify will handle it, but prettier will not.
    try {
      beautified = prettier.format(beautified, {
        parser: prettier.getFileInfo.sync(filepath).inferredParser,
        printWidth: 150, // strongly opinionated
      });
    } catch (err) {
      console.log(chalk.red(`Error while formatting ${filepath}`));
      console.log(err);
    }

    fs.writeFileSync(filepath, beautified);
  }
}
