# Dublin Bus React-Django App


With Dubin Bus being the biggest provider of transportation around Ireland, bus time prediction is central to the perceived quality of service by its users. Therefore, this project report is focused on both using historical data to create models to improve predictability and secondly outlining how this project has succeeded in allowing the results for the model to be displayed in an accessible and understandable way through the use of a web application. Central to this, this project report also discusses the approach to collaboration, details on system architecture before discussing the testing and results of the project

Visit our Dublin Bus app [here](http://ec2-34-245-45-115.eu-west-1.compute.amazonaws.com:3000/).

## Features

### Journey Planner

The journey planner feature provides dynamic travel time estimates for the next seven days. 

![Journey Planner](Dublin-bus/frontend/src/data/Journey_Planner.gif)

### Stops Search

The stops search feature aims to provide real-time information about buses that will arrive at a selected stop within the next hour, including line names, arrival times, and delays. In addition to selecting stops through the combo box, users can also select stops by clicking the stop icon on the map.

![Stops Search](Dublin-bus/frontend/src/data/Stops_Search.gif)

### Lines Search

The lines search feature aims to provide stop names and stop sequences in a selected bus line. And also the selected line and the stops in it will be displayed on the map

![Lines Search](Dublin-bus/frontend/src/data/Lines_Search.gif)

### Explore Nearby

The explore nearby feature can provide information about restaurants, hotels, and attractions near the user's current location. The blue location icon represents the user's current location on the map. Users can filter and display them by star rating. The display on the map will change according to the user's operation, and the user can also select the restaurant or hotel, or attraction they want to view through the map.

![Explore Nearby](Dublin-bus/frontend/src/data/Explore_Nearby.gif)

### Weather Forecast

The weather forecast feature can provide weather information for today and the next four days 

![Weather Forecast]((Dublin-bus/frontend/src/data/Weather_Forecast.jpg)

### Feedback

The feedback feature allows users to give the operator  feedback on their experience of using this app and their suggestions for its improvement. After the user fills in the form and clicks submit, the authors will receive the corresponding feedback email as an alert and all the feedback is available on getform.io website.

![Feedback](Dublin-bus/frontend/src/data/Feedback.png)

### News about Dublin Bus

The news feature can provide news about Dublin Bus using google search and Twitter.

![News about Dublin Bus](Dublin-bus/frontend/src/data/News.png)


## Technologies

- React
- Django
- PostgreSQL
- Tailwind CSS
- Jupyter Notebooks
- AWS EC2



## Installation

### Backend

1. Make sure you have Anaconda or Miniconda installed. Miniconda is a minimal installer for conda. This will be useful to set up a virtual environment to install the requirements.

- To install Miniconda follow [these instructions](https://docs.conda.io/en/latest/miniconda.html) acording to your operating system.

2. Use the package and environment manager [conda](https://docs.conda.io/en/latest/) to create a virtual environment with Python 3.8.

```bash
conda create --name <name_of_environment> python=3.8
```

3. Activate the environment.

```bash
conda activate <name_of_environment>
```

4. Install the `requirements.txt` file which has all the Python packages required for running the app.

```bash
cd dublinbus/
pip install -r requirements.txt
```

#### Linting & formatting backend code

We use [Black](https://github.com/psf/black) to lint and format our Python code.
When `requirements.txt` is installed, Black will automatically be installed in the selected virtual environment.

If you change the backend code, please run the following command before committing new changes:

```bash
black .
```

### Frontend

#### Linting & formatting frontend code

We use `prettier` to lint frontend code (Javascript, HTML and CSS)
To run `prettier`:

1. Install node.js and npm (https://nodejs.org/en/ v14) (they come in the same installer);
2. Run `npm install -g prettier`
3. `sudo` might be needed to have write permissions
4. Run `prettier --write .` on the project folder

If you change the frontend/template code, please run the following command before committing new changes:

```bash
cd dublinbus/
prettier --write .
```

## Running the Django app locally

To run the Django app locally you need to connect to the development MySQL database. We are using Docker to create a local MySQL instance so we can reproduce our production environment in which we have a MySQL database. 

To install Docker:

1. Go to https://docs.docker.com/get-docker/, choose the option based on your OS and install it according to the guide.

2. Create local environment variables (to make things simple, we should all use the same values):
- DEVELOPMENT_DATABASE_USER
- DEVELOPMENT_DATABASE_PASSWORD
- DEVELOPMENT_DATABASE_HOST
- DEVELOPMENT_DATABASE_PORT (note: choose a port number different from 3306 so it does not conflict with a MySQL database you may already have running at port 3306);

3. For the first time only, run the following command in the terminal to create and run a MySQL instance locally with the same version as the MySQL database on Heroku:
```bash
docker run -p ${DEVELOPMENT_DATABASE_PORT}:3306  --name mysql -e MYSQL_ROOT_PASSWORD=${DEVELOPMENT_DATABASE_PASSWORD} -d mysql:5.6.50 
```
- here`mysql` is the name we are giving to the container.
- we will need to create these environment variables for our production database too.
- note: if you are using Windows, the way to retrieve the env variable value in this and following commands should be %DEVELOPMENT_DATABASE_PORT%, %DEVELOPMENT_DATABASE_PASSWORD% and %DEVELOPMENT_DATABASE_USER%

4. After the above command, and only the first time as well, run the following command to create a database/schema named "dublin_bus" (we will need to create a schema with the same name in the production DB too):
```bash
docker exec mysql mysql -u ${DEVELOPMENT_DATABASE_USER} -p${DEVELOPMENT_DATABASE_PASSWORD} -e  "CREATE DATABASE IF NOT EXISTS dublin_bus;"
```

5. Now the set up is complete. You can leave the MySQL instance running in the background or, from your terminal, you can start it before running the app locally and stop it after shutting down the app locally. Steps 1, 2, 3 and 4 don't need to be done again in the future.

To start the MySQL instance:
```bash
docker start mysql
```
To stop the MySQL instance:
```bash
docker stop mysql
```

6. Now that the local MySQL instance is running it's time to create the tables and insert the data into the database.

6.1. Unzip the file `dublinbus/main/migrations/dublinbus_team14_backendsqldump_200821.zip` into the same folder. This has a sql file that contains the instructions to insert the data in the database.
- note: the file had to be compressed due to Github storage limits (100MB).

6.2. Run the following command to insert the data in the database:

```bash
docker exec -i mysql mysql -u${DEVELOPMENT_DATABASE_USER} -p${DEVELOPMENT_DATABASE_PASSWORD} < ./main/migrations/dublinbus_team14_backendsqldump_200821.sql
```
- note 1: this sql file will create the necessary schema and tables in the database as well as insert the data. 
- note 2: this is quicker to insert the data than using Django data migrations and also allows our CI to easily create a test database without having to do the data migrations which would be very slow due to the amount of data. 

7. Create env variables for API keys
- GOOGLEMAPS_APIKEY
- WEATHER_APIKEY 

8. To run the app locally execute the following commands, be aware the local docker MySQL instance must be running before:

```bash
cd dublinbus
python manage.py runserver
```

Open http://127.0.0.1:8000/ and you should see the app running.
