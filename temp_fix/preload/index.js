"use strict";
const electron = require("electron");
const api = {};
const electronAPI = {
  ipcRenderer: {
    invoke: electron.ipcRenderer.invoke.bind(electron.ipcRenderer),
    send: electron.ipcRenderer.send.bind(electron.ipcRenderer),
    on: electron.ipcRenderer.on.bind(electron.ipcRenderer),
    removeAllListeners: electron.ipcRenderer.removeAllListeners.bind(electron.ipcRenderer)
  },
  // P2P相关API
  p2p: {
    // 服务控制
    start: () => electron.ipcRenderer.invoke("p2p:start"),
    stop: () => electron.ipcRenderer.invoke("p2p:stop"),
    getStatus: () => electron.ipcRenderer.invoke("p2p:getStatus"),
    // 消息相关
    sendDirectMessage: (params) => electron.ipcRenderer.invoke("p2p:sendDirectMessage", params),
    sendGroupMessage: (params) => electron.ipcRenderer.invoke("p2p:sendGroupMessage", params),
    getChatHistory: (params) => electron.ipcRenderer.invoke("p2p:getChatHistory", params),
    getGroupChatHistory: (params) => electron.ipcRenderer.invoke("p2p:getGroupChatHistory", params),
    markMessagesAsRead: (params) => electron.ipcRenderer.invoke("p2p:markMessagesAsRead", params),
    deleteMessage: (params) => electron.ipcRenderer.invoke("p2p:deleteMessage", params),
    recallMessage: (params) => electron.ipcRenderer.invoke("p2p:recallMessage", params),
    // 联系人相关
    addContact: (params) => electron.ipcRenderer.invoke("p2p:addContact", params),
    getContacts: () => electron.ipcRenderer.invoke("p2p:getContacts"),
    deleteContact: (params) => electron.ipcRenderer.invoke("p2p:deleteContact", params),
    updateContact: (params) => electron.ipcRenderer.invoke("p2p:updateContact", params),
    searchContacts: (params) => electron.ipcRenderer.invoke("p2p:searchContacts", params),
    getContactRequests: () => electron.ipcRenderer.invoke("p2p:getContactRequests"),
    handleContactRequest: (params) => electron.ipcRenderer.invoke("p2p:handleContactRequest", params),
    // 群组相关
    createGroup: (params) => electron.ipcRenderer.invoke("p2p:createGroup", params),
    getGroups: () => electron.ipcRenderer.invoke("p2p:getGroups"),
    joinGroup: (params) => electron.ipcRenderer.invoke("p2p:joinGroup", params),
    leaveGroup: (params) => electron.ipcRenderer.invoke("p2p:leaveGroup", params),
    getGroupMembers: (params) => electron.ipcRenderer.invoke("p2p:getGroupMembers", params),
    inviteToGroup: (params) => electron.ipcRenderer.invoke("p2p:inviteToGroup", params),
    // 节点发现
    getDiscoveredPeers: () => electron.ipcRenderer.invoke("p2p:getDiscoveredPeers"),
    getConnectedPeers: () => electron.ipcRenderer.invoke("p2p:getConnectedPeers"),
    // 同步相关
    getUnsyncedMessages: () => electron.ipcRenderer.invoke("p2p:getUnsyncedMessages"),
    getContactChanges: () => electron.ipcRenderer.invoke("p2p:getContactChanges"),
    broadcastContactChanges: (changes) => electron.ipcRenderer.invoke("p2p:broadcastContactChanges", changes)
  }
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
