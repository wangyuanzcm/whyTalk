(module
  ;; 导入内存
  (import "env" "memory" (memory 1))
  
  ;; 导入日志函数
  (import "env" "log" (func $log (param i32 i32)))
  
  ;; 数据段 - 存储字符串
  (data (i32.const 0) "Hello from WASM plugin!")
  (data (i32.const 32) "Processing data...")
  (data (i32.const 64) "WASM computation complete")
  
  ;; 简单的加法函数
  (func $add (export "add") (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add
  )
  
  ;; 简单的乘法函数
  (func $multiply (export "multiply") (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.mul
  )
  
  ;; 问候函数 - 返回字符串在内存中的位置
  (func $greet (export "greet") (result i32)
    ;; 记录日志
    i32.const 0   ;; 字符串起始位置
    i32.const 23  ;; 字符串长度
    call $log
    
    ;; 返回字符串在内存中的位置
    i32.const 0
  )
  
  ;; 数据处理函数
  (func $process_data (export "process_data") (param $input i32) (result i32)
    ;; 记录处理开始
    i32.const 32  ;; "Processing data..." 位置
    i32.const 18  ;; 字符串长度
    call $log
    
    ;; 简单的数据处理：输入值 * 2 + 10
    local.get $input
    i32.const 2
    i32.mul
    i32.const 10
    i32.add
    
    ;; 记录处理完成
    i32.const 64  ;; "WASM computation complete" 位置
    i32.const 25  ;; 字符串长度
    call $log
  )
  
  ;; 获取字符串长度的辅助函数
  (func $get_string_length (export "get_string_length") (param $str_ptr i32) (result i32)
    (local $len i32)
    (local $current i32)
    
    local.get $str_ptr
    local.set $current
    i32.const 0
    local.set $len
    
    ;; 简单的字符串长度计算（假设以0结尾）
    (loop $count_loop
      local.get $current
      i32.load8_u
      i32.eqz
      br_if 1  ;; 如果是0，退出循环
      
      local.get $len
      i32.const 1
      i32.add
      local.set $len
      
      local.get $current
      i32.const 1
      i32.add
      local.set $current
      
      br $count_loop
    )
    
    local.get $len
  )
  
  ;; 内存操作函数 - 写入数据到指定位置
  (func $write_memory (export "write_memory") (param $offset i32) (param $value i32)
    local.get $offset
    local.get $value
    i32.store
  )
  
  ;; 内存操作函数 - 从指定位置读取数据
  (func $read_memory (export "read_memory") (param $offset i32) (result i32)
    local.get $offset
    i32.load
  )
  
  ;; 斐波那契数列计算
  (func $fibonacci (export "fibonacci") (param $n i32) (result i32)
    (local $a i32)
    (local $b i32)
    (local $temp i32)
    (local $i i32)
    
    ;; 处理边界情况
    local.get $n
    i32.const 2
    i32.lt_s
    if (result i32)
      local.get $n
    else
      ;; 初始化
      i32.const 0
      local.set $a
      i32.const 1
      local.set $b
      i32.const 2
      local.set $i
      
      ;; 循环计算
      (loop $fib_loop
        local.get $i
        local.get $n
        i32.le_s
        if
          local.get $a
          local.get $b
          i32.add
          local.set $temp
          
          local.get $b
          local.set $a
          local.get $temp
          local.set $b
          
          local.get $i
          i32.const 1
          i32.add
          local.set $i
          
          br $fib_loop
        end
      )
      
      local.get $b
    end
  )
)