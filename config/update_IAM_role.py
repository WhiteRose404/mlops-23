# update IAM role
import json
import requests
from pathlib import Path

def get_credentials(url):
    response = requests.get(url);
    data = json.loads(response.text);
    access_key = data["AccessKeyId"];
    secret_key = data["SecretAccessKey"];
    token = data["Token"];
    return access_key, secret_key, token;

def store_aws_credentials(access_key, secret_key, token):
    # store the credentials in the file
    aws = Path(f"{Path.home()}/.aws");
    if not aws.exists():
        aws.mkdir();
    with open(f"{Path.home()}/.aws/credentials", 'w') as file:
        file.write(f"[default]\naws_access_key_id = {access_key}\naws_secret_access_key = {secret_key}\naws_session_token = {token}\n");

if __name__ == "__main__":
    # get the credentials
    url = "http://169.254.169.254/latest/meta-data/iam/security-credentials/admin-Role";
    print("fetching credentials from AWS")
    access_key, secret_key, token = get_credentials(url);
    print("storing credentials in ~/.aws/credentials")
    store_aws_credentials(access_key, secret_key, token);
    print("done")