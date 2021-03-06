/* Page is opened when user clicks on the search bar. 
  Page takes in the list of possible search results that can be included in the drop down list.
  Clicking on cancel will redirect to the previous page. 
*/
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //Get the search results data that was sent through the eventChannel from searchbar component
    var that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      let type = data.type;
      let searchObjectsArray = data.searchObjectsArray;
      console.log(searchObjectsArray);
      //upload the type and searchObjectsArray
      that.setData({
        type: type,
        searchObjectsArray: searchObjectsArray
      });
    });
 
  }, 
  selectResult: function(e){
    //Function should be called when the user clicks on the searchbar in the previous page to open this page.
    //Receive the list of search result strings and the search function the search bar can use to choose results.
    console.log("Search Page selectresult called");
    let itemID = e.detail.item.id;
    let type = this.data.type;
    
    //Navigate to the Item Page and send type and itemID
    wx.navigateTo({
      url: '../item/item',
      success: function(res){
        res.eventChannel.emit('acceptDataFromOpenerPage', {type: type, id: itemID});
      },
      fail: function(err){
        console.error(err);
      }
    });
  }
})