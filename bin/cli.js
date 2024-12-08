#!/usr/bin/env node

const { program } = require('commander')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const glob = require('glob')

const banner = `
███████╗███████╗███████╗
██╔════╝██╔════╝██╔════╝
███████╗███████╗███████╗
╚════██║╚════██║╚════██║
███████║███████║███████║
╚══════╝╚══════╝╚══════╝
SuperSimpleStyle CLI v1.0.0
`

program
  .version('1.0.0')
  .description(chalk.cyan(banner) + '\n a super simple way to add basic styled react components')

program
  .command('add')
  .alias('a')
  .description('add a new component')
  .action(async () => {
    // todo
  })

program
  .command('init')
  .description('initialize supersimplestyle in your project')
  .action(async () => {
    try {
      console.log(chalk.cyan('\ninitializing supersimplestyle...'))
      
      const pkg_path = path.join(process.cwd(), 'package.json')
      if (!await fs.pathExists(pkg_path)) {
        console.error(chalk.red('❌ No package.json found. Please run npm init first.'))
        process.exit(1)
      }

      const directories = [
        'components/ui',
        'components/hooks',
        'components/utils',
        'components/layouts',
        'components/providers'
      ]

      for (const dir of directories) {
        await fs.ensureDir(dir)
        console.log(chalk.green(`✓ created ${dir}`))
      }

      const dependencies = {}
    //     "class-variance-authority": "^0.7.0",
    //     "clsx": "^2.0.0",
    //     "tailwind-merge": "^2.0.0",
    //     "next-themes": "^0.2.1"
    //   } -> not sure about these yet

      const pkg = await fs.readJson(pkg_path)
      pkg.dependencies = { ...pkg.dependencies, ...dependencies }
      
      await fs.writeJson(pkg_path, pkg, { spaces: 2 })
      
      console.log(chalk.yellow('\nadding required dependencies...'))
      console.log(chalk.blue('npm install ' + Object.keys(dependencies).join(' ')))

      console.log(chalk.green('\n✨ supersimplestyle initialized successfully!'))
      console.log(chalk.cyan('\nget started:'))
      console.log('  1. run npm install to install dependencies')
      console.log('  2. use ' + chalk.bold('sss add') + ' to add components')
      console.log('  3. check out docs at https://github.com/aquaticcalf/supersimplestyle')
      
    } catch (error) {
      console.error(chalk.red('Error:', error.message))
      process.exit(1)
    }
  })

program.parse(process.argv)