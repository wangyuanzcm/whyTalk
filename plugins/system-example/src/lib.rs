// 系统插件示例 - Rust 源代码
// 这个插件将被编译为 WASM 模块，在 Extism 运行时中执行

use extism_pdk::*;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

// 消息结构定义
#[derive(Serialize, Deserialize, Debug)]
struct Message {
    #[serde(rename = "type")]
    msg_type: String,
    content: String,
    timestamp: Option<String>,
    metadata: Option<HashMap<String, String>>,
}

#[derive(Serialize, Deserialize, Debug)]
struct ProcessedMessage {
    original: Message,
    processed_content: String,
    processing_time: u64,
    word_count: usize,
    sentiment: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct SystemInfo {
    plugin_name: String,
    plugin_version: String,
    memory_usage: String,
    uptime: u64,
    capabilities: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug)]
struct FileOperation {
    operation: String, // "read", "write", "list", "delete"
    path: String,
    content: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
struct FileOperationResult {
    success: bool,
    result: Option<String>,
    error: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
struct NetworkRequest {
    url: String,
    method: String,
    headers: Option<HashMap<String, String>>,
    body: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
struct NetworkResponse {
    status: u16,
    headers: HashMap<String, String>,
    body: String,
    success: bool,
}

// 插件入口点：处理消息
#[plugin_fn]
pub fn process_message(input: String) -> FnResult<String> {
    let start_time = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_millis() as u64;
    
    // 解析输入消息
    let message: Message = match serde_json::from_str(&input) {
        Ok(msg) => msg,
        Err(e) => {
            return Ok(format!("{{\"error\": \"Failed to parse message: {}\"}}}", e));
        }
    };
    
    // 处理消息内容
    let processed_content = match message.msg_type.as_str() {
        "text" => process_text_message(&message.content),
        "command" => process_command_message(&message.content),
        "data" => process_data_message(&message.content),
        _ => format!("Unknown message type: {}", message.msg_type),
    };
    
    // 计算处理时间
    let end_time = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_millis() as u64;
    let processing_time = end_time - start_time;
    
    // 分析文本情感（简单实现）
    let sentiment = analyze_sentiment(&message.content);
    
    // 统计词数
    let word_count = message.content.split_whitespace().count();
    
    let processed = ProcessedMessage {
        original: message,
        processed_content,
        processing_time,
        word_count,
        sentiment,
    };
    
    match serde_json::to_string(&processed) {
        Ok(json) => Ok(json),
        Err(e) => Ok(format!("{{\"error\": \"Failed to serialize result: {}\"}}}", e)),
    }
}

// 获取系统信息
#[plugin_fn]
pub fn get_system_info(_input: String) -> FnResult<String> {
    let system_info = SystemInfo {
        plugin_name: "system-example".to_string(),
        plugin_version: "1.0.0".to_string(),
        memory_usage: "2.5MB".to_string(), // 在实际实现中可以获取真实内存使用
        uptime: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
        capabilities: vec![
            "message_processing".to_string(),
            "text_analysis".to_string(),
            "file_operations".to_string(),
            "network_requests".to_string(),
            "sentiment_analysis".to_string(),
        ],
    };
    
    match serde_json::to_string(&system_info) {
        Ok(json) => Ok(json),
        Err(e) => Ok(format!("{{\"error\": \"Failed to serialize system info: {}\"}}}", e)),
    }
}

// 文件操作
#[plugin_fn]
pub fn file_operations(input: String) -> FnResult<String> {
    let operation: FileOperation = match serde_json::from_str(&input) {
        Ok(op) => op,
        Err(e) => {
            let result = FileOperationResult {
                success: false,
                result: None,
                error: Some(format!("Failed to parse operation: {}", e)),
            };
            return Ok(serde_json::to_string(&result).unwrap_or_default());
        }
    };
    
    let result = match operation.operation.as_str() {
        "read" => {
            // 在实际实现中，这里会调用主机提供的文件读取函数
            // 由于这是示例，我们模拟文件读取
            if operation.path.ends_with(".txt") {
                FileOperationResult {
                    success: true,
                    result: Some(format!("Content of file: {}", operation.path)),
                    error: None,
                }
            } else {
                FileOperationResult {
                    success: false,
                    result: None,
                    error: Some("Only .txt files are supported in this example".to_string()),
                }
            }
        },
        "write" => {
            // 模拟文件写入
            if let Some(content) = operation.content {
                FileOperationResult {
                    success: true,
                    result: Some(format!("Written {} bytes to {}", content.len(), operation.path)),
                    error: None,
                }
            } else {
                FileOperationResult {
                    success: false,
                    result: None,
                    error: Some("No content provided for write operation".to_string()),
                }
            }
        },
        "list" => {
            // 模拟目录列表
            FileOperationResult {
                success: true,
                result: Some(format!("[\"file1.txt\", \"file2.txt\", \"subdir/\"] in {}", operation.path)),
                error: None,
            }
        },
        "delete" => {
            // 模拟文件删除
            FileOperationResult {
                success: true,
                result: Some(format!("Deleted: {}", operation.path)),
                error: None,
            }
        },
        _ => {
            FileOperationResult {
                success: false,
                result: None,
                error: Some(format!("Unknown operation: {}", operation.operation)),
            }
        }
    };
    
    match serde_json::to_string(&result) {
        Ok(json) => Ok(json),
        Err(e) => Ok(format!("{{\"error\": \"Failed to serialize result: {}\"}}}", e)),
    }
}

// 网络请求
#[plugin_fn]
pub fn network_request(input: String) -> FnResult<String> {
    let request: NetworkRequest = match serde_json::from_str(&input) {
        Ok(req) => req,
        Err(e) => {
            let response = NetworkResponse {
                status: 400,
                headers: HashMap::new(),
                body: format!("Failed to parse request: {}", e),
                success: false,
            };
            return Ok(serde_json::to_string(&response).unwrap_or_default());
        }
    };
    
    // 在实际实现中，这里会调用主机提供的网络请求函数
    // 由于这是示例，我们模拟网络请求
    let response = if request.url.contains("api.github.com") {
        let mut headers = HashMap::new();
        headers.insert("content-type".to_string(), "application/json".to_string());
        headers.insert("server".to_string(), "GitHub.com".to_string());
        
        NetworkResponse {
            status: 200,
            headers,
            body: format!("{{\"message\": \"Simulated response from {}\", \"method\": \"{}\"}}", request.url, request.method),
            success: true,
        }
    } else if request.url.contains("httpbin.org") {
        let mut headers = HashMap::new();
        headers.insert("content-type".to_string(), "application/json".to_string());
        
        NetworkResponse {
            status: 200,
            headers,
            body: format!("{{\"url\": \"{}\", \"method\": \"{}\", \"data\": \"test\"}}", request.url, request.method),
            success: true,
        }
    } else {
        NetworkResponse {
            status: 403,
            headers: HashMap::new(),
            body: "Host not allowed".to_string(),
            success: false,
        }
    };
    
    match serde_json::to_string(&response) {
        Ok(json) => Ok(json),
        Err(e) => Ok(format!("{{\"error\": \"Failed to serialize response: {}\"}}}", e)),
    }
}

// 辅助函数：处理文本消息
fn process_text_message(content: &str) -> String {
    let processed = content
        .to_lowercase()
        .replace("bad", "***")
        .replace("spam", "***");
    
    format!("Processed text: {}", processed)
}

// 辅助函数：处理命令消息
fn process_command_message(content: &str) -> String {
    match content {
        "ping" => "pong".to_string(),
        "time" => format!("Current time: {}", 
            std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_secs()),
        "version" => "Plugin version: 1.0.0".to_string(),
        _ => format!("Unknown command: {}", content),
    }
}

// 辅助函数：处理数据消息
fn process_data_message(content: &str) -> String {
    // 尝试解析为JSON并格式化
    match serde_json::from_str::<serde_json::Value>(content) {
        Ok(json) => {
            match serde_json::to_string_pretty(&json) {
                Ok(pretty) => format!("Formatted JSON:\n{}", pretty),
                Err(_) => "Failed to format JSON".to_string(),
            }
        },
        Err(_) => format!("Raw data (length: {}): {}", content.len(), 
            if content.len() > 100 { 
                format!("{}...", &content[..100]) 
            } else { 
                content.to_string() 
            }),
    }
}

// 辅助函数：简单情感分析
fn analyze_sentiment(text: &str) -> String {
    let positive_words = ["good", "great", "excellent", "amazing", "wonderful", "fantastic", "love", "like", "happy", "joy"];
    let negative_words = ["bad", "terrible", "awful", "hate", "dislike", "sad", "angry", "frustrated", "disappointed"];
    
    let text_lower = text.to_lowercase();
    let mut positive_count = 0;
    let mut negative_count = 0;
    
    for word in positive_words.iter() {
        if text_lower.contains(word) {
            positive_count += 1;
        }
    }
    
    for word in negative_words.iter() {
        if text_lower.contains(word) {
            negative_count += 1;
        }
    }
    
    if positive_count > negative_count {
        "positive".to_string()
    } else if negative_count > positive_count {
        "negative".to_string()
    } else {
        "neutral".to_string()
    }
}