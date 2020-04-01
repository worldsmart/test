<template>
  <div class="home" style='margin: 10px 10px auto 10px'>
    <v-progress-linear
                v-if="loading"
                indeterminate
                color="cyan"
        ></v-progress-linear>
    <v-container v-if="!loading">
    <v-row>
      <template>
        <v-col>
          <v-card class="mx-auto" outlined width='100%'>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">FTP parsing logs</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div>
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Clients processed</th>
                      <th class="text-left">Files processed</th>
                      <th class="text-left">err</th>
                      <th class="text-left">Start</th>
                      <th class="text-left">End</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in logs.ftp_parser" :key='index'  @click="showInfo(item)">
                      <td>{{item.client_processing.length}}</td>
                      <td>{{numberOfFiles(item.client_processing)}}</td>
                      <td>{{item.err ? item.err : '-'}}</td>
                      <td>{{`${new Date(item.start).getDate()}.${new Date(item.start).getMonth() + 1}.${new Date(item.start).getFullYear()}  ${new Date(item.start).getHours()}:${(new Date(item.start).getMinutes() > 9) ? new Date(item.start).getMinutes() : '0' + new Date(item.start).getMinutes()}:${(new Date(item.start).getSeconds() > 9) ? new Date(item.start).getSeconds() : '0' + new Date(item.start).getSeconds()}`}}</td>
                      <td>{{`${new Date(item.end).getDate()}.${new Date(item.end).getMonth() + 1}.${new Date(item.end).getFullYear()}  ${new Date(item.end).getHours()}:${(new Date(item.end).getMinutes() > 9) ? new Date(item.end).getMinutes() : '0' + new Date(item.end).getMinutes()}:${(new Date(item.end).getSeconds() > 9) ? new Date(item.end).getSeconds() : '0' + new Date(item.end).getSeconds()}`}}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="mx-auto" outlined width='100%'>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">Push to SLIM logs</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div>
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Orders</th>
                      <th class="text-left">Success</th>
                      <th class="text-left">Err</th>
                      <th class="text-left">Client</th>
                      <th class="text-left">Start</th>
                      <th class="text-left">End</th>
                    </tr> 
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in logs.push_to_slim" :key='index'  @click="showInfo(item)">
                      <td>{{item.orders_count}}</td>
                      <td>{{item.orders_pushed}}</td>
                      <td>{{item.orders_failed}}</td>
                      <td>{{item.client_slim_id}}</td>
                      <td>{{`${new Date(item.start).getDate()}.${new Date(item.start).getMonth() + 1}.${new Date(item.start).getFullYear()} ${new Date(item.start).getHours()}:${(new Date(item.start).getMinutes() > 9) ? new Date(item.start).getMinutes() : '0' + new Date(item.start).getMinutes()}:${(new Date(item.start).getSeconds() > 9) ? new Date(item.start).getSeconds() : '0' + new Date(item.start).getSeconds()}`}}</td>
                      <td>{{`${new Date(item.end).getDate()}.${new Date(item.end).getMonth() + 1}.${new Date(item.end).getFullYear()}  ${new Date(item.end).getHours()}:${(new Date(item.end).getMinutes() > 9) ? new Date(item.end).getMinutes() : '0' + new Date(item.end).getMinutes()}:${(new Date(item.end).getSeconds() > 9) ? new Date(item.end).getSeconds() : '0' + new Date(item.end).getSeconds()}`}}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </v-card>
        </v-col>
      </template>
    </v-row>

    <v-overlay v-model="overlay">
          {{info}}
          <v-card
    class="mx-auto"
    max-width="60%"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          {{`${new Date(info.start).getDate()}.${new Date(info.start).getMonth() + 1}.${new Date(info.start).getFullYear()} ${new Date(info.start).getHours()}:${(new Date(info.start).getMinutes() > 9) ? new Date(info.start).getMinutes() : '0' + new Date(info.start).getMinutes()}:${(new Date(info.start).getSeconds() > 9) ? new Date(info.start).getSeconds() : '0' + new Date(info.start).getSeconds()} - ${new Date(info.end).getDate()}.${new Date(info.end).getMonth() + 1}.${new Date(info.end).getFullYear()} ${new Date(info.end).getHours()}:${(new Date(info.end).getMinutes() > 9) ? new Date(info.end).getMinutes() : '0' + new Date(info.end).getMinutes()}:${(new Date(info.end).getSeconds() > 9) ? new Date(info.end).getSeconds() : '0' + new Date(info.end).getSeconds()}`}}
        </div>
        <div v-if="info.client_slim_id">
          <v-list-item one-line>
            Orders count: <v-chip class="ma-2">{{info.orders_count}}</v-chip>
          </v-list-item>  
          <v-list-item one-line>
           Successfully pushed: <v-chip class="ma-2" color="green">{{info.orders_pushed}}</v-chip>
          </v-list-item> 
          <v-list-item one-line>
           Pushing failed: <v-chip class="ma-2" color="red">{{info.orders_failed}}</v-chip>
          </v-list-item> 
          <v-list-item v-if='info.failed_orders[0]' one-line>
           Failed orders:
           <v-chip v-for="(item, index) in info.failed_orders" :key='index' class="ma-2">Id: {{item.id}} | Number: {{item.name}}</v-chip>
          </v-list-item> 
        </div>

        <div v-if="!info.client_slim_id">
          <v-list-item one-line>
           Clients processed: <v-chip class="ma-2">{{info.client_processing ? info.client_processing.length : ''}}</v-chip>
          </v-list-item> 
          <v-list-item one-line style="max-height:400px; overflow-y:scroll">
            <v-treeview :items="getItems(info)" dense>
            </v-treeview>
          </v-list-item>
          <v-list-item one-line>
           Script error: <v-chip class="ma-2" color="red">{{!!info.err}}</v-chip>
          </v-list-item>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions> 
      <v-btn @click="overlay = false">
            Hide Overlay
          </v-btn>
    </v-card-actions>
  </v-card>
        </v-overlay>
  </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: function(){
    return{
      overlay: false,
      logs: {
        
      },
      loading: true,
      info: {}
    }
  },
  methods:{
    showInfo: function(data){
      this.info = data;
      this.overlay = true;
    },
    numberOfFiles: function(clients){
      let counter = 0;
      for(let i = 0;i < clients.length;i++){
        counter += clients[i].processed_files.length;
      }
      return counter;
    },
    getItems: function(item){
      if(item.client_processing){
        let r = [{id: -1, name: "Clients", children: [ ]}];
      for(let i = 0;i < item.client_processing.length;i++){
        let files = [];
        for(let y = 0;y < item.client_processing[i].processed_files.length;y++){
          files.push({id: i+2*y+2, name: item.client_processing[i].processed_files[y].original_name, children: [{name: "Original name: " + item.client_processing[i].processed_files[y].original_name }, {name: "Local name: " + item.client_processing[i].processed_files[y].local_name }, {name: "Status: " + item.client_processing[i].processed_files[y].status}] });
        }
        r[0].children.push({id: -i - 3, name: "CABOOTER", children: [{id: -i-4, name: "Files processed", children: files }, {id: -i-5, name: "Status: " + item.client_processing[i].status}] })
      }
      return r;
      }
    }
  },
  created: function(){
    this.$http.get('/api/log', {
                    headers: {
                        Authorization: localStorage.getItem('jwt')
                    }
                }).then((res) => {
                    this.logs = res.body;
                    this.loading = false;
                }, (err) => {
                    console.log(err);
                });
  }
}
</script>

<style lang="scss">
  ::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>