import connexion
import json
import logging
import logging.config
import requests
import yaml

statuses = {
    "receiver": "",
    "storage": "",
    "processing": ""
}

service_urls = {
    "receiver": "http://52.39.252.17/receiver/health",
    "storage": "http://52.39.252.17/storage/health",
    "processing": "http://52.39.252.17/processing/health"
}

def check():
    # TODO - use try except block(s) to send a GET request to each of your services /health endpoints (receiver, storage, and processing)
        
    # For each service, check if the response has status code 200, e.g. res.status_code == 200

    # If the status code for a given service is 200, index into the statuses dict and assign the string "Up" to the correct service key

    # If the status is not 200, or an exception is thrown because the request cannot be completed, index into the statuses dict and assign the string "Down" to the correct key
    for service_name, service_url in service_urls.items():
        try:
            res = requests.get(service_url)
            if res.status_code == 200:
                statuses[service_name] = "Running"
            else:
                statuses[service_name] = "Down"
        except:
            statuses[service_name] = "Down"
    
    print(statuses)
    return statuses, 200 # ignore the instructions to convert this to JSON and leave as-is

app = connexion.FlaskApp(__name__, specification_dir='')

# if you are deploying this to your VM, make sure to add base_path="/health" to the add_api method (and update your NGINX config to proxy requests to the health service)
app.add_api("openapi.yml", strict_validation=True, validate_responses=True)

with open('log_conf.yml', 'r') as f:
    log_config = yaml.safe_load(f.read())
    logging.config.dictConfig(log_config)

logger = logging.getLogger('basic')

if __name__ == "__main__":
    app.run(port=8110)