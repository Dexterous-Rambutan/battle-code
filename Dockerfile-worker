FROM node
RUN mkdir worker

# This command makes `/worker/` the current working directory. You can assume you are 'inside' that directory for all following commands
WORKDIR worker

# TODO: ADD all the application code into /worker
ADD ./worker /worker
ADD package.json /worker
ADD ./node_modules /worker/node_modules
ADD ./server/solutions/solutionModel.js /worker/solutions/solutionModel.js
ADD ./server/challenges/challengeModel.js /worker/challenges/challengeModel.js
ADD ./server/users/userModel.js /worker/users/userModel.js
ADD ./server/helpers/dbConfig.js /worker/helpers/dbConfig.js

# TODO: RUN `npm install`
RUN npm install forever -g

# EXPOSE 3000 
# This command allows us to access the web server port from outside the container

CMD ["forever", "solutionTester.js"] # `package.json` already provides this command
