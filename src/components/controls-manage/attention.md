###修改Form.vue克隆函数（formClone）解决刷新问题
####可在PyyTest.vue 186行找到代码
>从</br>
>formClone (originData) {</br>
        let newObj = this.L.cloneDeep(originData)</br>
        let _uuid = uuid.v4()</br>
        newObj.id = _uuid</br>
        return newObj</br>
      },</br>
改为</br>
formClone (originData) {</br>
        let updateData = JSON.parse(localStorage.getItem(originData.CNameEN))</br>
        if (updateData) {</br>
          return updateData</br>
        } else {</br>
          let newObj = this.L.cloneDeep(originData)</br>
          let _uuid = uuid.v4()</br>
          newObj.id = _uuid</br>
          return newObj</br>
        }</br>
      },
###在FormSettingsBak.vue中增加监听（在watch增加）
####可在PyyConfigTest.vue 2253行找到代码
>增加函数如下</br>
>config () {</br>
        if (this.config) {</br>
          this.deleteArr = []</br>
          let key = this.config.CName</br>
          let del = JSON.parse(localStorage.getItem('deleteAttribute'))[key]</br>
          if (del) {</br>
            this.deleteArr = del</br>
          }</br>
        }</br>
      },</br>
      'config.CAttribute.rangeOfFixedEnd' () {</br>
        this.startTime = ''</br>
        this.stepTime = ''</br>
        this.endTime = ''</br>
      }</br>
###增加FormSettingsBak.vue中data的属性校验（rulesAdd本来为空，现在增加内容）
####可在PyyConfigTest.vue 2188行找到代码
>内容如下</br>
rulesAdd: {</br>
          label: [</br>
            {required: true, message: '请输入选项值'},</br>
            {</br>
              validator: (rules, value, callback) => {</br>
                this.config.CAttribute.itemAttr.forEach((item, index) => {</br>
                  if (item.label === value && index !== this.config.CAttribute.itemAttr.length - 1) {</br>
                    this.config.CAttribute.itemAttr[this.config.CAttribute.itemAttr.length - 1].label = ''</br>
                    callback(new Error('选项值不可以重复'))</br>
                  }</br>
                })</br>
                callback()</br>
              }</br>
            }</br>
          ]</br>
        }</br>
