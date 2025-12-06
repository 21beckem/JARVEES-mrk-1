from browser_use import Agent, Browser, ChatGoogle
import asyncio


async def prompt_agent(prompt):
    agent = prepareBrowserAndAgent(prompt)
    history = await agent.run()

    return {
        'prompt': prompt,
        'success': history.is_successful(),
        'result': history.final_result()
    }

async def terminal_prompter():
    while True:
        promt = input('Enter a prompt: ')
        if promt == "exit":
            break
        agent = prepareBrowserAndAgent(promt)
        history = await agent.run()

        if history.is_successful():
            print('yay! we did it!')
            print('Response: ', history.final_result())
        else:
            print('Oh no! something went wrong!')
            print('result:', history.last_action())

async def test():
    agent = prepareBrowserAndAgent(''' Follow these instructions:
    1. open drive.google.com/drive/u/3/my-drive
    2. create a new document
    3. name it "Jarvees!"
    4. on the main document itself, type "hello world"
''')
    history = await agent.run()
    if history.is_successful():
        print('yay! we did it!')
        print('Response: ', history.final_result())
    else:
        print('Oh no! something went wrong!')

def prepareBrowserAndAgent(promptStr):
    global agent
    browser = Browser(
        executable_path='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        user_data_dir='C:\\Users\\21bec\\AppData\\Local\\Microsoft\\Edge\\User Data\\',
        profile_directory='Default',
	    window_size={'width': 1000, 'height': 700}
    )

    agent = Agent(
        task = promptStr,
        llm = ChatGoogle(model='gemini-flash-lite-latest'),
        browser = browser
    )
    return agent

if __name__ == "__main__":
    history = asyncio.run(test())





'''
AgentHistoryList(
    all_results=[
        ActionResult(is_done=False, success=None, judgement=None, error=None, attachments=None, images=None, long_term_memory="Searched Duckduckgo for 'when was google founded'", extracted_content="Searched Duckduckgo for 'when was google founded'", include_extracted_content_only_once=False, metadata=None, include_in_memory=False),
        
        ActionResult(is_done=True, success=True, judgement=JudgementResult(reasoning="The user asked for the year Google was founded. The agent correctly searched for this information using DuckDuckGo. The search result provided the answer immediately in the 'Search Assist' snippet: 'Google was founded on September 4, 1998'. The agent then correctly concluded the task and provided the answer: 'Google was founded in 1998. Specifically, September 4, 1998.' This fully satisfies the user request. Tool usage was appropriate and effective. The trajectory was short and successful.", verdict=True, failure_reason='', impossible_task=False, reached_captcha=False), error=None, attachments=[], images=None, long_term_memory='Task completed: True - Google was founded in 1998. Specifically, September 4, 1998.', extracted_content='Google was founded in 1998. Specifically, September 4, 1998.', include_extracted_content_only_once=False, metadata=None, include_in_memory=False)
    ],
    all_model_outputs=[
        {
            'search': {
                'query': 'when was google founded',
                'engine': 'duckduckgo'
            },
            'interacted_element': None
        },
        {
            'done': {
                'text': 'Google was founded in 1998. Specifically, September 4, 1998.',
                'success': True,
                'files_to_display': []
            },
            'interacted_element': None
        }
    ]
)


AgentHistoryList(
    all_results=[
        ActionResult(is_done=False, success=None, judgement=None, error="429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit. \\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 0, model: gemini-2.5-flash-preview-image\\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.5-flash-preview-image\\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.5-flash-preview-image\\nPlease retry in 33.930369448s.', 'status': 'RESOURCE_EXHAUSTED', 'details': [{'@type': 'type.googleapis.com/google.rpc.Help', 'links': [{'description': 'Learn more about Gemini API quotas', 'url': 'https://ai.google.dev/gemini-api/docs/rate-limits'}]}, {'@type': 'type.googleapis.com/google.rpc.QuotaFailure', 'violations': [{'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_input_token_count', 'quotaId': 'GenerateContentInputTokensPerModelPerMinute-FreeTier', 'quotaDimensions': {'model': 'gemini-2.5-flash-preview-image', 'location': 'global'}}, {'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerMinutePerProjectPerModel-FreeTier', 'quotaDimensions': {'location': 'global', 'model': 'gemini-2.5-flash-preview-image'}}, {'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerDayPerProjectPerModel-FreeTier', 'quotaDimensions': {'location': 'global', 'model': 'gemini-2.5-flash-preview-image'}}]}, {'@type': 'type.googleapis.com/google.rpc.RetryInfo', 'retryDelay': '33s'}]}}", attachments=None, images=None, long_term_memory=None, extracted_content=None, include_extracted_content_only_once=False, metadata=None, include_in_memory=False),
        
        ActionResult(is_done=False, success=None, judgement=None, error="429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit. \\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 0, model: gemini-2.5-flash-preview-image\\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.5-flash-preview-image\\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.5-flash-preview-image\\nPlease retry in 33.728003105s.', 'status': 'RESOURCE_EXHAUSTED', 'details': [{'@type': 'type.googleapis.com/google.rpc.Help', 'links': [{'description': 'Learn more about Gemini API quotas', 'url': 'https://ai.google.dev/gemini-api/docs/rate-limits'}]}, {'@type': 'type.googleapis.com/google.rpc.QuotaFailure', 'violations': [{'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_input_token_count', 'quotaId': 'GenerateContentInputTokensPerModelPerMinute-FreeTier', 'quotaDimensions': {'location': 'global', 'model': 'gemini-2.5-flash-preview-image'}}, {'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerMinutePerProjectPerModel-FreeTier', 'quotaDimensions': {'location': 'global', 'model': 'gemini-2.5-flash-preview-image'}}, {'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerDayPerProjectPerModel-FreeTier', 'quotaDimensions': {'location': 'global', 'model': 'gemini-2.5-flash-preview-image'}}]}, {'@type': 'type.googleapis.com/google.rpc.RetryInfo', 'retryDelay': '33s'}]}}", attachments=None, images=None, long_term_memory=None, extracted_content=None, include_extracted_content_only_once=False, metadata=None, include_in_memory=False),
        
        ActionResult(is_done=False, success=None, judgement=None, error="429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit. \\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 0, model: gemini-2.5-flash-preview-image\\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.5-flash-preview-image\\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.5-flash-preview-image\\nPlease retry in 33.398228023s.', 'status': 'RESOURCE_EXHAUSTED', 'details': [{'@type': 'type.googleapis.com/google.rpc.Help', 'links': [{'description': 'Learn more about Gemini API quotas', 'url': 'https://ai.google.dev/gemini-api/docs/rate-limits'}]}, {'@type': 'type.googleapis.com/google.rpc.QuotaFailure', 'violations': [{'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_input_token_count', 'quotaId': 'GenerateContentInputTokensPerModelPerMinute-FreeTier', 'quotaDimensions': {'location': 'global', 'model': 'gemini-2.5-flash-preview-image'}}, {'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerMinutePerProjectPerModel-FreeTier', 'quotaDimensions': {'location': 'global', 'model': 'gemini-2.5-flash-preview-image'}}, {'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerDayPerProjectPerModel-FreeTier', 'quotaDimensions': {'location': 'global', 'model': 'gemini-2.5-flash-preview-image'}}]}, {'@type': 'type.googleapis.com/google.rpc.RetryInfo', 'retryDelay': '33s'}]}}", attachments=None, images=None, long_term_memory=None, extracted_content=None, include_extracted_content_only_once=False, metadata=None, include_in_memory=False),
        
        ActionResult(is_done=False, success=None, judgement=None, error="429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit. \\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.5-flash-preview-image\\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.5-flash-preview-image\\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, limit: 0, model: gemini-2.5-flash-preview-image\\nPlease retry in 33.132532915s.', 'status': 'RESOURCE_EXHAUSTED', 'details': [{'@type': 'type.googleapis.com/google.rpc.Help', 'links': [{'description': 'Learn more about Gemini API quotas', 'url': 'https://ai.google.dev/gemini-api/docs/rate-limits'}]}, {'@type': 'type.googleapis.com/google.rpc.QuotaFailure', 'violations': [{'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerDayPerProjectPerModel-FreeTier', 'quotaDimensions': {'location': 'global', 'model': 'gemini-2.5-flash-preview-image'}}, {'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerMinutePerProjectPerModel-FreeTier', 'quotaDimensions': {'location': 'global', 'model': 'gemini-2.5-flash-preview-image'}}, {'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_input_token_count', 'quotaId': 'GenerateContentInputTokensPerModelPerMinute-FreeTier', 'quotaDimensions': {'model': 'gemini-2.5-flash-preview-image', 'location': 'global'}}]}, {'@type': 'type.googleapis.com/google.rpc.RetryInfo', 'retryDelay': '33s'}]}}", attachments=None, images=None, long_term_memory=None, extracted_content=None, include_extracted_content_only_once=False, metadata=None, include_in_memory=False)
    ],
    all_model_outputs=[]
)
'''