/**
 * Created by kent on 11/14/2015.
 */

app.provider('$userProvider', function() {
    this.$get = ['oluserDataFactory', '$q', function (oluserDataFactory, $q) {
        var $userProvider = {};
        $userProvider.isSignedIn = function () {
            return oluserDataFactory.getOLUserToken().then(function(data){
                var isSigned = false;
                if(data.data.length === 0) {
                    isSigned = false;
                }else{
                    isSigned = true;
                }
                return isSigned;
            });
        };
        return $userProvider;
    }];
});