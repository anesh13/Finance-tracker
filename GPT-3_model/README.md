1. CLI data preparation tool
    openai tools fine_tunes.prepare_data -f <LOCAL_FILE>
2. Uploads the file using the files API (or uses an already-uploaded file)
3. Create a fine-tuned model
    openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL>
4. Use a fine-tuned model
    openai api completions.create -m <FINE_TUNED_MODEL> -p <YOUR_PROMPT>
    Python:
            import openai
            openai.Completion.create(
                model=FINE_TUNED_MODEL,
                prompt=YOUR_PROMPT)
    Nodejs: 
            const response = await openai.createCompletion({
                model: FINE_TUNED_MODEL
                prompt: YOUR_PROMPT,
             });