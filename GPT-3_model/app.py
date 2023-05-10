import openai
import json
import os


# export OPENAI_API_KEY=<your-api-key>
openai.api_key = os.getenv("OPENAI_API_KEY")
if openai.api_key is None:
    print("API key NOT set")
else:
    print("API key set")

### create the training data to create a fine-tuned model for finance tracker web app

### CLI data preparation tool
### Data must be in JSONL document
### CLI: openai tools fine_tunes.prepare_data -f <LOCAL_FILE>

# convert json to jsonl
## prompt has to end with the indicator string `? ->
## completion with a suffix \n.

# # read the json file (if need to convert file to jsonl)
# with open("training_data.json", "r") as input_file:
#     training_data = json.load(input_file)

file_name = "training_data_prepared.jsonl"
# with open(file_name, "w") as output_file:
#     for entry in training_data:
#         json.dump(entry, output_file)
#         output_file.write("\n")


# Upload training data to OpenAI to use the file id to fine tune the model
upload_response = openai.File.create(
    file=open(file_name, "rb"),
    purpose='fine-tune'
)

file_id = upload_response.id
print(file_id)


# Create a fine-tuned model
# CLI openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL>

fine_tuning = openai.FineTune.create(training_file=file_id, model="davinci")
print(fine_tuning)


# List all events
# CLI: openai api fine_tunes.list
# fine_tune_events = openai.FineTune.list_events(id=fine_tuning.id)
# print(fine_tune_events)


# retrieve fine tune job
# CLI: openai api fine_tunes.get -i <YOUR_FINE_TUNE_JOB_ID>
# export OPENAI_API_KEY= < key > set env variable
retrieve_response = openai.FineTune.retrieve(id=fine_tuning.id)
print(retrieve_response)

# openai api fine_tunes.follow -i < key > to follow progress
# ex: openai api fine_tunes.follow -i ft-8dj0u8HekDEcuv5hZF1oXCCp

# When job status is "succeeded", you can use the fine_tuned model