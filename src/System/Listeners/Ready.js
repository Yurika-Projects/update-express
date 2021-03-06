const { Listener } = require('discord-akairo');
const slashCommands = require('../../Extended/SlashCommands');
const { logger } = require('../../Extended/Logger');
const config = require('../Config/config');

module.exports = class Readylistener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      category: 'client',
      event: 'ready',
    });
  }

  async exec() {
    this.client.logger.info(`CLIENT READY WITH ${this.client.guilds.cache.size} GUILDS`);
    this.client.user.setActivity(`Turu`, { type: 5 });
    this.client.erela.init(this.client.user.id);
    if (!config.updateSlash) return;
    /* eslint no-restricted-syntax: "off" */
    for (const command of slashCommands) {
      this.client.application.commands.create(command.toJSON());
      logger.info(`CREATING ${command.name.toUpperCase()} SLASH COMMAND`);
    }
  }
};
