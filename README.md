<center>
<img src="https://parseplatform.org/img/logo.svg" />
</center>

# A all in one command/module to run:
  - parse
  - the graphql backend
  - the parse's playground
  - the parse's dashboard
  
If you run it as a command most of the settings can be made via environment variables

# Limitations
 - Not implemented nontrivial json settings, like auths, and cloud.js setup
 
# Differential
 - Just start this and mongodb and you are ready to start playing with it
 - If you have `nix` you can start the mongo database and robomongo (GUI for mongo) just using `yarn mongod` or `yarn robomongo`
 - You can create schemas for entities in a web interface and parse server takes care of request validation and even graphql entities :exploding_head:

# TODO
 - Install it as a global command then you can configure a project structure and just run this in the root of the project to load all that settings
