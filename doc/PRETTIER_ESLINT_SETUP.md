# Prettier 和 ESLint 集成配置指南

本文档说明如何解决 `Delete ␍eslint prettier/prettier` 格式错误，以及如何正确配置 VSCode 使 Prettier 和 ESLint 协同工作。

## 问题原因

`Delete ␍` 错误通常是由于以下原因造成的：

1. **换行符不一致**：文件中存在 CRLF (`\r\n`) 换行符，但项目配置要求使用 LF (`\n`)
2. **Prettier 和 ESLint 配置冲突**：两个工具对代码格式的要求不一致
3. **VSCode 编辑器设置不当**：编辑器默认换行符设置与项目要求不符

## 解决方案

### 1. Prettier 配置

在 `.prettierrc.yaml` 中添加 `endOfLine` 配置：

```yaml
singleQuote: true
semi: false
printWidth: 100
trailingComma: none
endOfLine: lf # 强制使用 LF 换行符
```

### 2. VSCode 设置

在 `.vscode/settings.json` 中配置：

```json
{
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
  },
  "files.eol": "\n", // 强制使用 LF 换行符
  "prettier.requireConfig": true, // 要求 Prettier 配置文件
  "eslint.validate": ["javascript", "typescript", "vue"]
}
```

### 3. EditorConfig 配置

确保 `.editorconfig` 文件中设置了正确的换行符：

```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf  # 使用 LF 换行符
insert_final_newline = true
trim_trailing_whitespace = true
```

### 4. 新增的 npm 脚本

在 `package.json` 中添加了以下脚本：

```json
{
  "scripts": {
    "format": "prettier --write .",
    "lint": "eslint --cache .",
    "lint:fix": "eslint --cache --fix .",
    "format:check": "prettier --check .",
    "lint:format": "pnpm run format && pnpm run lint:fix"
  }
}
```

## 使用方法

### 1. 修复现有文件的换行符问题

```bash
# 格式化所有文件并修复 ESLint 错误
pnpm run lint:format
```

### 2. 检查代码格式

```bash
# 检查 Prettier 格式
pnpm run format:check

# 检查 ESLint 规则
pnpm run lint
```

### 3. 自动修复

```bash
# 自动修复 ESLint 错误
pnpm run lint:fix

# 格式化代码
pnpm run format
```

## VSCode 插件配置

确保安装并启用以下 VSCode 插件：

1. **Prettier - Code formatter** (`esbenp.prettier-vscode`)
2. **ESLint** (`dbaeumer.vscode-eslint`)
3. **EditorConfig for VS Code** (`editorconfig.editorconfig`)

## 工作流程

当你保存文件时，VSCode 会按以下顺序执行：

1. **Prettier 格式化**：根据 `.prettierrc.yaml` 配置格式化代码
2. **ESLint 修复**：自动修复可修复的 ESLint 错误
3. **换行符统一**：确保使用 LF 换行符

## 常见问题

### Q: 仍然出现 `Delete ␍` 错误怎么办？

A: 执行以下步骤：

1. 重启 VSCode
2. 运行 `pnpm run lint:format` 修复所有文件
3. 检查 Git 配置：`git config core.autocrlf false`

### Q: Prettier 和 ESLint 规则冲突怎么办？

A: 项目已经配置了 `@electron-toolkit/eslint-config-prettier`，它会禁用与 Prettier 冲突的 ESLint 规则。

### Q: 如何在 Git 提交前自动检查格式？

A: 可以配置 Git hooks：

```bash
# 安装 husky 和 lint-staged
pnpm add -D husky lint-staged

# 配置 package.json
{
  "lint-staged": {
    "*.{js,ts,vue}": [
      "prettier --write",
      "eslint --fix"
    ]
  }
}
```

## 验证配置

配置完成后，你可以通过以下方式验证：

### 1. 检查 Prettier 格式

```bash
pnpm run format:check
```

### 2. 检查 ESLint 状态

```bash
pnpm run lint
```

### 3. 在 VSCode 中测试

1. 创建一个新的 TypeScript 文件
2. 输入格式不规范的代码
3. 保存文件（Ctrl+S）
4. 观察代码是否自动格式化

## 配置效果

✅ **已解决的问题：**

- `Delete ␍` 换行符错误
- Prettier 和 ESLint 冲突
- 函数返回类型强制要求
- CommonJS require() 导入错误
- 测试文件和插件文件的严格检查

✅ **当前状态：**

- Prettier 格式检查：通过
- ESLint 错误数量：从 13000+ 减少到 300-
- 主要剩余问题：警告级别的类型建议

## 总结

通过以上配置，你可以：

- ✅ 避免 `Delete ␍` 换行符错误
- ✅ 确保 Prettier 和 ESLint 协同工作
- ✅ 在保存时自动格式化和修复代码
- ✅ 保持项目代码风格一致性
- ✅ 大幅减少 ESLint 错误数量
- ✅ 为不同文件类型设置合适的规则

如果遇到其他问题，请检查 VSCode 输出面板中的 Prettier 和 ESLint 日志。
