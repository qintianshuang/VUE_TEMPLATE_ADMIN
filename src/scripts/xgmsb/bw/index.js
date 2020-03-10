// import sbHdxx from '@/components/Xgmsb/SbHdxx'
import { saveFpData } from '@/api/xgm/bw'
export default {
  components: {
    // sbHdxx
  },
  data() {
    return {
      sbbwForm: {
        zcsbbw: '',
        wqsbbw: '',
        sbtjbw: '',
        qtsbbw: ''
      }
    }
  },
  watch: {},
  methods: {
    save() {
      saveSbbw(this.sbbwForm).then(response => {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success'
          })
          this.visible = false
        } else {
          this.$notify.error({
            title: '错误',
            message: response.message
          })
        }
      })
    }
  }
}
