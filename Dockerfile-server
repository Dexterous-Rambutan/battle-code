FROM node
RUN mkdir server

# This command makes `/server/` the current working directory. You can assume you are 'inside' that directory for all following commands
WORKDIR server

# TODO: ADD all the application code into /server
ADD ./server /server
ADD package.json /server
ADD ./node_modules /server/node_modules

# TODO: RUN `npm install`
# RUN npm install

EXPOSE 3000 
# This command allows us to access the web server port from outside the container

CMD ["node", "server.js"] # `package.json` already provides this command
