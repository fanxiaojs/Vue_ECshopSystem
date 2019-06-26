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
      //要默认选中的数据源
      morenxuanzhong: [],
      //设置权限角色的ID
      rid: 0
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
    openRoles(rightsData, id) {
      this.rid = id
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
    },
    //设置权限
    setRightsFn() {



      //获取更新后的权限               
      //getCheckedNodes: 只会得到全选的ID 不会得得到半选的
      //getHalfCheckedNodes: 只会得到半选的ID 不会得到全选的
      let idsA = this.$refs.tree.getCheckedKeys()
      let idsH = this.$refs.tree.getHalfCheckedKeys()
      //将全选和半选组合起来
      let ids = [...idsA, ...idsH]
      //将ids转成字符串
      ids = ids.join(',')
      console.log(this.rid);
      console.log(idsA);
      console.log(idsH);
      console.log(ids);

      this.$http({
        method: 'post',
        url: `roles/${this.rid}/rights`,
        data: {
          rids: ids
        }
      }).then(res => {
        let {
          meta,
          data
        } = res.data
        console.log(res);

        if (meta.status == 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
          this.getdata()
        } else {
          this.$message.error(meta.msg)
        }
      })
      this.roleDialog = false
    }
  },
  mounted() {
    this.getdata()
  },
}
