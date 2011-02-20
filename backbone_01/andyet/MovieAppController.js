var MovieAppController = {
  init: function (spec) {
    // default config
    this.config = {
      connect: true
    };


    // extend our default config with passed in object attributes
    _.extend(this.config, spec);


    this.model = new MovieAppModel({
      nick: this.config.nick,
      account: this.config.account,
      jid: this.config.jid,
      boshUrl: this.config.boshUrl
    });
    this.view = new MovieAppView({model: this.model});


    // standalone modules that respond to document events
    this.sm = new SoundMachine();


    return this;
  },


  // any other functions here should be events handlers that respond to
  // document level events. In my case I was using this to respond to incoming XMPP
  // events. So the logic for knowing what those meant and creating or updating our
  // models and collections lived here.
  handlePubSubUpdate: function () {};
};
