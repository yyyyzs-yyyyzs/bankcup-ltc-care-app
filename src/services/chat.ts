// DeepSeek API 服务
// 通过本地 Vite 代理转发，避免 CORS + 保护 API Key

const API_BASE = '/api/deepseek';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `你是"厦门银行银龄服务平台"的智能客服助手，名字叫"银龄小助手"。

你的职责：
1. 帮助老人和子女分析养老照护需求，推荐合适的服务
2. 回答关于长护险、养老服务、银行客户权益的问题
3. 语气温暖、耐心、通俗易懂，像是一个懂养老的朋友

平台提供的八大服务板块：
- 身体评估与照护建议：银行+医护上门评估老人身体状况
- 居家生活照护：助餐、助浴、助洁、助行、起居照护、如厕护理、用药提醒、定期探访
- 医护康复服务：上门护理、康复训练、慢病管理、护理指导、认知筛查、营养指导、心理支持
- 陪诊助医与交通接送：陪诊、取药送药、就医交通、住院协助
- 社区日间照料：日间托老、认知活动、康复活动、社交活动、社区助餐
- 养老机构与短期托养：机构查询、短期托养、术后康复、认知症照护
- 辅具租赁与适老化改造：轮椅租赁、护理床、浴室改造、紧急呼叫
- 家庭照护监管：子女查看服务流水、费用账单、异常提醒

银行客户有三档权益：基础客户（开户即享）、进阶客户（持续缴存）、尊享客户（长期客户）。
价格举例：上门助浴市场价150元→客户价120元，陪诊市场价220元→客户价180元。

规则：
1. 简洁具体，不超过200字
2. 涉及服务时写出服务名称和参考价格
3. 涉及长护险时，提醒以医保局正式评定为准
4. 不清楚的问题，建议拨打平台热线`;

export async function sendMessage(
  userMessage: string,
  history: ChatMessage[] = [],
  onChunk?: (chunk: string) => void,
): Promise<string> {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;

  if (!apiKey || apiKey === 'your_deepseek_api_key_here') {
    return simulateResponse(userMessage);
  }

  const messages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.slice(-10),
    { role: 'user', content: userMessage },
  ];

  try {
    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 800,
        stream: !!onChunk,
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.error('DeepSeek error:', response.status, errText);
      throw new Error(`API error ${response.status}`);
    }

    if (onChunk) {
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No stream reader');
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter((l) => l.startsWith('data: '));
        for (const line of lines) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content || '';
            if (content) {
              fullText += content;
              onChunk(content);
            }
          } catch { /* skip */ }
        }
      }
      return fullText;
    } else {
      const data = await response.json();
      return data.choices[0]?.message?.content || '抱歉，暂时无法回复。';
    }
  } catch (error) {
    console.error('DeepSeek API error:', error);
    return simulateResponse(userMessage);
  }
}

// 本地模拟回复（无 API Key 时自动降级）
import { getChatResponse } from '../data/chatData';

function simulateResponse(userMessage: string): Promise<string> {
  const result = getChatResponse(userMessage);
  let text = result.content;
  if (result.recommendations?.length) {
    text += '\n\n推荐服务：\n' + result.recommendations.map((r) => `${r.icon} ${r.title}：${r.desc}`).join('\n');
  }
  return Promise.resolve(text);
}
