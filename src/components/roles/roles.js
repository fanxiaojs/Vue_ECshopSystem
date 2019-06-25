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
      },
      morenxuanzhong: []
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
    openRoles(rightsData) {
      this.morenxuanzhong = []
      this.$http({
        method: 'get',
        url: 'rights/tree'
      }).then(res => {
        //解构    
        let {
          data,
          meta
        } = res.data
        //打开面板
        this.roleDialog = true
        //将数据保存起来
        this.rightsList = data
        //将所有三级权限的id添加到morenxuanzhong中
        //遍历第一级
        rightsData.forEach(item1 => {
          //遍历第二级
          item1.children.forEach(item2 => {
            //遍历第三极
            item2.children.forEach(item3 => {
              this.morenxuanzhong.push(item3.id)
            })
          })
        });
        if (res.status == 200) {

        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted() {
    this.getdata()
  },
}
