# Llama Chatbot with FastAPI

A beautiful, ChatGPT-like interface for interacting with Llama models using FastAPI and Ollama. This project provides a modern web interface for chatting with Llama AI models.

## Features

- 🎨 Modern, ChatGPT-like user interface
- 💻 Code syntax highlighting with copy functionality
- 🔄 Real-time chat interactions
- 📱 Responsive design
- 🎯 New chat functionality
- ⚡ Fast response times using Ollama

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- Ollama (for running Llama models locally)
- A Llama model downloaded via Ollama

### Installing Ollama and Llama Model

1. Install Ollama by following the instructions at [Ollama's official website](https://ollama.ai/)

2. Pull the Llama model using Ollama:
```bash
ollama pull llama3.2:1b
```

## Installation

1. Clone this repository:
```bash
git clone https://github.com/humayun-ahmad/chatbot-with-llama3.2-1b.git
cd chatbot-with-llama3.2-1b
```

2. Create a virtual environment and activate it:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. Install the required dependencies:
```bash
pip install -r requirements.txt
```

## Project Structure

Create the following project structure:
```
your-project/
├── static/
│   ├── styles.css
│   └── scripts.js
├── index.html
├── main.py
├── requirements.txt
└── README.md
```

## Setting Up Files

1. Create a `static` folder in your project directory

2. Save the provided `styles.css` and `scripts.js` files in the `static` folder

3. Save the provided `index.html` in your project root directory

4. Save the FastAPI code as `main.py` in your project root directory

## Running the Application

1. Make sure Ollama is running in the background

2. Start the FastAPI server:
```bash
uvicorn app:app --reload
```

3. Open your web browser and navigate to:
- The API will be available at:
```
http://localhost:8000
or
http://127.0.0.1:8000/
```
- Documentation for the API (Swagger UI) will be available at:
```
http://localhost:8000/docs
or
http://127.0.0.1:8000/docs
```


## Usage

1. The interface will load with a welcome message

2. Type your message in the input box at the bottom

3. Press Enter or click the Send button to send your message

4. The Llama model will process your message and respond

5. Use the "New Chat" button to start a fresh conversation

## Troubleshooting

### Common Issues and Solutions

1. **Ollama Not Responding**
   - Ensure Ollama is running in the background
   - Check if the Llama model is properly downloaded
   - Restart Ollama service

2. **FastAPI Server Won't Start**
   - Verify all dependencies are installed
   - Check if the port 8000 is available
   - Ensure Python version is compatible

3. **Static Files Not Loading**
   - Verify the `static` folder is in the correct location
   - Check file permissions
   - Ensure filenames match exactly

### Error Messages

If you see these error messages, here's what to do:

- `"Model execution failed"`: Restart Ollama and verify model installation
- `"Connection refused"`: Check if Ollama is running
- `"Module not found"`: Run pip install for missing dependencies

## Customization

### Changing the Model

To use a different Llama model, modify the `subprocess.run()` command in `main.py`:

```python
result = subprocess.run(
    ["ollama", "run", "your-preferred-model", request.prompt],
    capture_output=True, text=True
)
```

### Modifying the Interface

- Edit `styles.css` to change the appearance
- Modify `index.html` to alter the layout
- Update `scripts.js` to change functionality

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- UI inspired by ChatGPT
- Built with FastAPI and Ollama
- Syntax highlighting by Prism.js
