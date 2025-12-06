from flask import Flask, request, render_template
from browser import prompt_agent

app = Flask(__name__)

@app.route('/')
def index():
    return 'Jarvees Browser Agent'


@app.route('/run_agent', methods=['POST'])
async def run_agent():
    prompt = request.json.get('prompt')
    return await prompt_agent(prompt)

if __name__ == '__main__':
    app.run(port=5000, debug=False)