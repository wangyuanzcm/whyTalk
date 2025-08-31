<template>
  <div class="screenshot-capture">
    <!-- 截图按钮组 -->
    <div class="screenshot-buttons">
      <n-button-group>
        <n-button
          type="primary"
          @click="captureFullscreen"
          :loading="isCapturing"
          :disabled="isCapturing"
        >
          <template #icon>
            <n-icon><ScreenshotIcon /></n-icon>
          </template>
          全屏截图
        </n-button>
        
        <n-button
          type="primary"
          @click="captureWindow"
          :loading="isCapturing"
          :disabled="isCapturing"
        >
          <template #icon>
            <n-icon><WindowIcon /></n-icon>
          </template>
          窗口截图
        </n-button>
        
        <n-button
          type="primary"
          @click="captureRegion"
          :loading="isCapturing"
          :disabled="isCapturing"
        >
          <template #icon>
            <n-icon><CropIcon /></n-icon>
          </template>
          区域截图
        </n-button>
      </n-button-group>
    </div>

    <!-- 截图预览 -->
    <div v-if="screenshotResult" class="screenshot-preview">
      <div class="preview-header">
        <h3>截图预览</h3>
        <div class="preview-actions">
          <n-button size="small" @click="saveScreenshot" :disabled="!screenshotResult.filePath">
            <template #icon>
              <n-icon><SaveIcon /></n-icon>
            </template>
            保存
          </n-button>
          <n-button size="small" @click="copyToClipboard">
            <template #icon>
              <n-icon><CopyIcon /></n-icon>
            </template>
            复制
          </n-button>
          <n-button size="small" @click="analyzeWithAI">
            <template #icon>
              <n-icon><AnalyzeIcon /></n-icon>
            </template>
            AI分析
          </n-button>
          <n-button size="small" @click="clearPreview">
            <template #icon>
              <n-icon><CloseIcon /></n-icon>
            </template>
            清除
          </n-button>
        </div>
      </div>
      
      <div class="preview-content">
        <img 
          v-if="screenshotResult.base64" 
          :src="`data:image/png;base64,${screenshotResult.base64}`" 
          alt="截图预览"
          class="preview-image"
        />
        <div v-else class="preview-placeholder">
          <n-icon size="48"><ImageIcon /></n-icon>
          <p>截图已保存到: {{ screenshotResult.filePath }}</p>
        </div>
      </div>
    </div>

    <!-- 区域选择模态框 -->
    <n-modal v-model:show="showRegionSelector" class="region-selector-modal">
      <n-card
        style="width: 400px"
        title="选择截图区域"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div class="region-inputs">
          <n-form :model="regionForm" label-placement="left" label-width="60px">
            <n-form-item label="X坐标">
              <n-input-number v-model:value="regionForm.x" :min="0" placeholder="X坐标" />
            </n-form-item>
            <n-form-item label="Y坐标">
              <n-input-number v-model:value="regionForm.y" :min="0" placeholder="Y坐标" />
            </n-form-item>
            <n-form-item label="宽度">
              <n-input-number v-model:value="regionForm.width" :min="1" placeholder="宽度" />
            </n-form-item>
            <n-form-item label="高度">
              <n-input-number v-model:value="regionForm.height" :min="1" placeholder="高度" />
            </n-form-item>
          </n-form>
        </div>
        
        <template #footer>
          <div class="modal-actions">
            <n-button @click="showRegionSelector = false">取消</n-button>
            <n-button type="primary" @click="confirmRegionCapture" :loading="isCapturing">
              确认截图
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>

    <!-- AI分析结果模态框 -->
    <n-modal v-model:show="showAIAnalysis" class="ai-analysis-modal">
      <n-card
        style="width: 600px; max-height: 80vh"
        title="AI分析结果"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div class="ai-analysis-content">
          <n-spin :show="isAnalyzing">
            <div v-if="aiAnalysisResult" class="analysis-result">
              <h4>UI分析报告</h4>
              <div class="analysis-text">
                {{ aiAnalysisResult.analysis }}
              </div>
              
              <h4 v-if="aiAnalysisResult.suggestions?.length">优化建议</h4>
              <ul v-if="aiAnalysisResult.suggestions?.length" class="suggestions-list">
                <li v-for="(suggestion, index) in aiAnalysisResult.suggestions" :key="index">
                  {{ suggestion }}
                </li>
              </ul>
            </div>
            <div v-else class="analysis-placeholder">
              <n-icon size="48"><AnalyzeIcon /></n-icon>
              <p>正在分析截图内容...</p>
            </div>
          </n-spin>
        </div>
        
        <template #footer>
          <div class="modal-actions">
            <n-button @click="showAIAnalysis = false">关闭</n-button>
            <n-button v-if="aiAnalysisResult" type="primary" @click="applyOptimizations">
              应用优化
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  NButton, 
  NButtonGroup, 
  NIcon, 
  NModal, 
  NCard, 
  NForm, 
  NFormItem, 
  NInputNumber,
  NSpin,
  useMessage
} from 'naive-ui'
import {
  Camera as ScreenshotIcon,
  Window as WindowIcon,
  Crop as CropIcon,
  Save as SaveIcon,
  Copy as CopyIcon,
  Analytics as AnalyzeIcon,
  Close as CloseIcon,
  Image as ImageIcon
} from '@vicons/ionicons5'

// 响应式数据
const message = useMessage()
const isCapturing = ref(false)
const screenshotResult = ref<Window['electron']['screenshot']['ScreenshotResult'] | null>(null)
const showRegionSelector = ref(false)
const showAIAnalysis = ref(false)
const isAnalyzing = ref(false)
const aiAnalysisResult = ref<{
  analysis: string
  suggestions: string[]
} | null>(null)

// 区域选择表单
const regionForm = reactive({
  x: 0,
  y: 0,
  width: 800,
  height: 600
})

/**
 * 全屏截图
 */
const captureFullscreen = async () => {
  try {
    isCapturing.value = true
    const result = await window.electron.screenshot.captureFullscreen({
      format: 'png',
      quality: 100
    })
    
    if (result.success) {
      screenshotResult.value = result
      message.success('全屏截图成功')
    } else {
      message.error(`截图失败: ${result.error}`)
    }
  } catch (error) {
    message.error(`截图失败: ${error}`)
  } finally {
    isCapturing.value = false
  }
}

/**
 * 窗口截图
 */
const captureWindow = async () => {
  try {
    isCapturing.value = true
    const result = await window.electron.screenshot.captureWindow({
      format: 'png',
      quality: 100
    })
    
    if (result.success) {
      screenshotResult.value = result
      message.success('窗口截图成功')
    } else {
      message.error(`截图失败: ${result.error}`)
    }
  } catch (error) {
    message.error(`截图失败: ${error}`)
  } finally {
    isCapturing.value = false
  }
}

/**
 * 区域截图
 */
const captureRegion = () => {
  showRegionSelector.value = true
}

/**
 * 确认区域截图
 */
const confirmRegionCapture = async () => {
  try {
    isCapturing.value = true
    const result = await window.electron.screenshot.captureRegion(
      {
        x: regionForm.x,
        y: regionForm.y,
        width: regionForm.width,
        height: regionForm.height
      },
      {
        format: 'png',
        quality: 100
      }
    )
    
    if (result.success) {
      screenshotResult.value = result
      showRegionSelector.value = false
      message.success('区域截图成功')
    } else {
      message.error(`截图失败: ${result.error}`)
    }
  } catch (error) {
    message.error(`截图失败: ${error}`)
  } finally {
    isCapturing.value = false
  }
}

/**
 * 保存截图
 */
const saveScreenshot = async () => {
  if (!screenshotResult.value?.filePath) {
    message.error('没有可保存的截图文件')
    return
  }
  
  try {
    await window.electron.screenshot.openDirectory()
    message.success('截图文件夹已打开')
  } catch (error) {
    message.error(`打开文件夹失败: ${error}`)
  }
}

/**
 * 复制到剪贴板
 */
const copyToClipboard = async () => {
  if (!screenshotResult.value?.base64) {
    message.error('没有可复制的截图数据')
    return
  }
  
  try {
    // 创建图片元素并复制到剪贴板
    const img = new Image()
    img.onload = async () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ])
          message.success('截图已复制到剪贴板')
        }
      })
    }
    img.src = `data:image/png;base64,${screenshotResult.value.base64}`
  } catch (error) {
    message.error(`复制失败: ${error}`)
  }
}

/**
 * AI分析截图
 */
const analyzeWithAI = async () => {
  if (!screenshotResult.value?.base64) {
    message.error('没有可分析的截图数据')
    return
  }
  
  try {
    showAIAnalysis.value = true
    isAnalyzing.value = true
    aiAnalysisResult.value = null
    
    // 模拟AI分析（实际应用中需要调用真实的AI服务）
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    aiAnalysisResult.value = {
      analysis: '检测到当前界面为聊天应用主界面，整体布局清晰，色彩搭配协调。界面采用了现代化的设计风格，具有良好的视觉层次。',
      suggestions: [
        '建议增加更多的视觉反馈，如按钮悬停效果',
        '可以考虑优化色彩对比度，提升可访问性',
        '建议添加更多的动画过渡效果，提升用户体验',
        '考虑在移动端优化响应式布局'
      ]
    }
    
    message.success('AI分析完成')
  } catch (error) {
    message.error(`AI分析失败: ${error}`)
  } finally {
    isAnalyzing.value = false
  }
}

/**
 * 应用优化建议
 */
const applyOptimizations = () => {
  message.info('优化建议已记录，将在后续版本中实现')
  showAIAnalysis.value = false
}

/**
 * 清除预览
 */
const clearPreview = () => {
  screenshotResult.value = null
  message.info('预览已清除')
}
</script>

<style scoped>
.screenshot-capture {
  padding: 16px;
}

.screenshot-buttons {
  margin-bottom: 16px;
}

.screenshot-preview {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--card-color);
  border-bottom: 1px solid var(--border-color);
}

.preview-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.preview-actions {
  display: flex;
  gap: 8px;
}

.preview-content {
  padding: 16px;
  text-align: center;
}

.preview-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--text-color-3);
}

.region-inputs {
  margin-bottom: 16px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.ai-analysis-content {
  min-height: 200px;
}

.analysis-result {
  text-align: left;
}

.analysis-result h4 {
  margin: 16px 0 8px 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color-1);
}

.analysis-text {
  padding: 12px;
  background-color: var(--code-color);
  border-radius: 4px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.suggestions-list {
  margin: 0;
  padding-left: 20px;
}

.suggestions-list li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.analysis-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 200px;
  color: var(--text-color-3);
}
</style>