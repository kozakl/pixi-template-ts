import fs from 'fs-extra';
import {exec} from 'child_process';

const server  = '/home/luke/Public/kozakluke.bitbucket.org/',
      process = exec('git describe --tags');
process.stdout.on('data', (tag)=> {
    const project = 'pixi-ts-template/' + tag.slice(0, tag.lastIndexOf('-')),
          cache   = Math.random();
    
    fs.removeSync(server + project);
    fs.copySync('./public', server + project);
    fs.renameSync(server + project + '/bundle.js',
                  server + project + `/bundle-${cache}.js`);
    fs.writeFileSync(server + project + '/index.html',
        fs.readFileSync(server + project + '/index.html', 'utf8')
        .replace('bundle.js', `bundle-${cache}.js`));
    
    const process = exec(`cd ${server} &&\
                          git add . &&\
                          git commit -m "Update: ${project}." &&\
                          git push origin`);
    process.stdout.on('data', console.log);
    process.stderr.on('data', console.log);
});
