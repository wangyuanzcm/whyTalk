<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Close, UploadOne, RefreshOne, Redo, Undo } from '@icon-park/vue-next'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { uploadFile } from '@/api/ipc-request'

// VueCropper实例类型定义
interface CropperInstance {
  getCropData: (callback: (data: string) => void) => void
  getCropBlob: (callback: (blob: Blob) => void) => void
  rotateLeft: () => void
  rotateRight: () => void
  refresh: () => void
}

const emit = defineEmits(['close', 'success'])
const state = reactive({
  show: true,
  src: ''
})

const cropper = ref<CropperInstance>()

const option = reactive({
  img: '',
  size: 1,
  full: false,
  outputType: 'png',
  canMove: true,
  fixedBox: true,
  original: false,
  canMoveBox: true,
  autoCrop: true,
  autoCropWidth: 250,
  autoCropHeight: 250,
  centerBox: false,
  high: true,
  preview: ''
})

const onMaskClick = () => {
  emit('close')
}

function onTriggerUpload() {
  (document.getElementById('upload-avatar') as HTMLInputElement)?.click()
}

const onUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (!e.target) return
    let data: string
    if (typeof e.target.result === 'object') {
      // 把Array Buffer转化为blob 如果是base64不需要
      data = window.URL.createObjectURL(new Blob([e.target.result as ArrayBuffer]))
    } else {
      data = e.target.result as string
    }

    option.img = data
  }

  reader.readAsArrayBuffer(file)
}

const realTime = () => {
  cropper.value?.getCropData((img: string) => {
    option.preview = img
  })
}

const rotateLeft = () => {
  cropper.value?.rotateLeft()
}
const rotateRight = () => {
  cropper.value?.rotateRight()
}

const refreshCrop = () => {
  cropper.value?.refresh()
}

const onSubmit = () => {
  cropper.value?.getCropBlob(async (blob: Blob) => {
    const file = new File([blob], 'avatar.png', {
      type: blob.type,
      lastModified: Date.now()
    })

    const { code, data } = await uploadFile(file) as { code: number; data: { src: string } }

    code == 200 && emit('success', data.src)
  })
}
</script>

<template>
  <input
    id="upload-avatar"
    type="file"
    accept="image/png, image/jpeg, image/jpg, image/webp"
    @change="onUpload"
  />
  <n-modal v-model:show="state.show" :on-after-leave="onMaskClick">
    <n-card style="width: 800px" title="选择头像" :bordered="false" class="modal-radius">
      <template #header-extra>
        <n-icon size="22" :component="Close" class="pointer" @click="state.show = false" />
      </template>

      <div class="content">
        <div class="canvas">
          <vue-cropper
            ref="cropper"
            :img="option.img"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="true"
            :full="option.full"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :fixed-box="option.fixedBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth"
            :auto-crop-height="option.autoCropHeight"
            :center-box="option.centerBox"
            @real-time="realTime"
          />
        </div>
        <div class="view">
          <div class="preview">
            <img v-show="option.preview" :src="option.preview" />
          </div>
        </div>
      </div>

      <template #footer>
        <section class="el-container" style="height: 38px">
          <aside
            class="el-aside"
            style="
              width: 400px;
              justify-content: space-between;
              align-items: center;
              display: flex;
              padding: 0 5px;
            "
          >
            <n-button type="primary" ghost @click="onTriggerUpload">
              上传图片
              <template #icon>
                <n-icon :component="UploadOne" />
              </template>
            </n-button>

            <n-button @click="refreshCrop">
              重置
              <template #icon>
                <n-icon :component="RefreshOne" />
              </template>
            </n-button>

            <n-button @click="rotateLeft">
              <template #icon>
                <n-icon :component="Undo" />
              </template>
              左转
            </n-button>

            <n-button @click="rotateRight">
              <template #icon>
                <n-icon :component="Redo" />
              </template>
              右转
            </n-button>
          </aside>
          <main class="el-main" style="text-align: center">
            <n-button type="primary" @click="onSubmit">保存头像</n-button>
          </main>
        </section>
      </template>
    </n-card>
  </n-modal>
</template>

<style lang="less" scoped>
#upload-avatar {
  display: none;
}
.content {
  width: 100%;
  height: 400px;
  display: flex;

  .canvas {
    width: 400px;
    height: 400px;
    padding: 5px;
  }

  .view {
    flex: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    .preview {
      width: 180px;
      height: 180px;
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid var(--border-color);

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
