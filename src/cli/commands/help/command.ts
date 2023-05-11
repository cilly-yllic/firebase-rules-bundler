import { Command as Program } from 'commander'

import { HelpOptions } from '../../../internal/types/options.js'
import { CommandClass } from '../../../internal/utils/command.js'

import { action } from './action.js'

const setAliases = (commandClass: CommandClass<HelpOptions>) => {
  commandClass.description('This command is used to show help').action(options => {
    return action(options)
  })
}

const commands = ['help', 'h']

export const init = (program: Program) => {
  for (const command of commands) {
    setAliases(new CommandClass<HelpOptions>(program).command(command))
  }
}
