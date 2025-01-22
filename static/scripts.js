// Auto-resize textarea
const textarea = document.getElementById('input-box');
textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 200) + 'px';
});

// Handle Enter key
textarea.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Send message function
async function sendMessage() {
    const input = document.getElementById('input-box');
    const messages = document.getElementById('messages');
    const text = input.value.trim();

    if (!text) return;

    // Add user message
    addMessage(text, 'user');
    
    // Clear input
    input.value = '';
    input.style.height = 'auto';

    try {
        // Show loading indicator
        const loadingMessage = addMessage('Thinking...', 'assistant');
        
        // Send request to API
        const response = await fetch('/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: text })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        
        // Remove loading message and add actual response
        loadingMessage.remove();
        addMessage(data.response, 'assistant');

    } catch (error) {
        console.error('Error:', error);
        addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
    }
}

// Add message to chat
function addMessage(text, type) {
    const messages = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Split text into paragraphs and create p elements
    const paragraphs = text.split('\n').filter(p => p.trim());
    paragraphs.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        contentDiv.appendChild(p);
    });
    
    messageDiv.appendChild(contentDiv);
    messages.appendChild(messageDiv);
    
    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight;
    
    return messageDiv;
}

// New chat button functionality
document.getElementById('new-chat-btn').addEventListener('click', function() {
    // Clear messages except the first system message
    const messages = document.getElementById('messages');
    const systemMessage = messages.querySelector('.message.system');
    messages.innerHTML = '';
    if (systemMessage) {
        messages.appendChild(systemMessage);
    }
});

// Load Prism.js from CDN for syntax highlighting
const prismScript = document.createElement('script');
prismScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js';
document.head.appendChild(prismScript);

// Load Prism.js components for different languages
const languages = ['javascript', 'python', 'bash', 'json', 'css', 'html'];
languages.forEach(lang => {
    const script = document.createElement('script');
    script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-${lang}.min.js`;
    document.head.appendChild(script);
});

// Previous JavaScript code remains the same, updating addMessage function

function addMessage(text, type) {
    const messages = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Process the text to identify code blocks
    const blocks = text.split(/(```[a-zA-Z]*\n[\s\S]*?\n```)/g);
    
    blocks.forEach(block => {
        if (block.startsWith('```')) {
            // Extract language and code
            const language = block.split('\n')[0].replace('```', '').trim() || 'plaintext';
            const code = block.split('\n').slice(1, -1).join('\n');
            
            // Create code block container
            const codeBlockContainer = document.createElement('div');
            codeBlockContainer.className = 'code-block-container';
            
            // Create header with language and copy button
            const header = document.createElement('div');
            header.className = 'code-block-header';
            
            const langSpan = document.createElement('span');
            langSpan.className = 'code-language';
            langSpan.textContent = language;
            
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy code';
            copyButton.onclick = () => {
                navigator.clipboard.writeText(code);
                copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy code';
                }, 2000);
            };
            
            header.appendChild(langSpan);
            header.appendChild(copyButton);
            
            // Create pre and code elements
            const pre = document.createElement('pre');
            pre.className = 'code-block';
            const codeElement = document.createElement('code');
            codeElement.className = `language-${language}`;
            codeElement.textContent = code;
            
            pre.appendChild(codeElement);
            codeBlockContainer.appendChild(header);
            codeBlockContainer.appendChild(pre);
            contentDiv.appendChild(codeBlockContainer);
            
            // Apply syntax highlighting
            if (window.Prism) {
                Prism.highlightElement(codeElement);
            }
        } else if (block.trim()) {
            // Process regular text with inline code
            const paragraphs = block.split('\n').filter(p => p.trim());
            paragraphs.forEach(paragraph => {
                const p = document.createElement('p');
                // Handle inline code with backticks
                p.innerHTML = paragraph.replace(/`([^`]+)`/g, '<code>$1</code>');
                contentDiv.appendChild(p);
            });
        }
    });
    
    messageDiv.appendChild(contentDiv);
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
    
    return messageDiv;
}

// Previous JavaScript code continues...