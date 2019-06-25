//引入面包屑导航
import Bread from '../layout/bread.vue'

export default {
  data() {
    return {
      tableData: [],
      roleDialog: false,
      rightsList: [],
      defaultProps: {
        label: 'authName'
      }
    }
  },
  components: {
    Bread
  },
  methods: {
    getdata() {
      this.$http({
        method: 'get',
        url: 'roles'
      }).then(res => {
        let {
          meta,
          data
        } = res.data
        if (meta.status == 200) {
          this.tableData = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    //删除权限
    delRights(rid, rightid, scope) {


      this.$http({
        method: 'delete',
        url: `roles/${rid}/rights/${rightid}`
      }).then(res => {
        let {
          meta,
          data
        } = res.data
        if (meta.status == 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
          scope.row.children = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    //打开权限数据
    openRoles() {
      this.roleDialog = true
      this.$http({
        method: 'get',
        url: 'rights/tree'
      }).then(res => {
        console.log(res);

        let {
          data,
          meta
        } = res.data
        this.rightsList = data
        if (res.status == 200) {

        }
      })
    }
  },
  mounted() {
    this.getdata()
  },
}
