(function (aKa) {
    var KEY = 'RUNKEEPER_',
        KEY_TEST = /RUNKEEPER_\d/gi,
        CID = 0; //client-side ID for localStorage

    //need to compile this for consistent results?
    KEY_TEST.compile();

    function fillDummyData() {
        var data = [
            {
                name     : 'WI State Marathon',
                date     : '2015-05-02',
                location : 'Kenosha, WI',
                cost     : 100
            },
            {
                name     : 'Tough Mudder',
                date     : '2015-05-09',
                location : 'Richmond, IL',
                cost     : 100
            }
        ];

        for (var i = 0; i < data.length; i++) {
            localStorage.setItem(
                KEY + CID,
                JSON.stringify(data[i])
            );

            CID++;
        }

        return data;
    }

    function generateCid () {
        var newCid = KEY + CID;

        //it's possible CIDs already exist; don't overwrite them
        while (localStorage[newCid]) {
            CID++;
            newCid = KEY + CID;
        }

        return newCid;
    }

    aKa.Data = {
        getLocalData : function (fillDummy) {
            var data = [];

            //fill localstorage with test data
            if (!localStorage.length && fillDummy) {
                data = fillDummyData();
            }
            //get data from localStorage
            else {
                for (var key in localStorage) {
                    if (KEY_TEST.test(key)) {
                        var obj = JSON.parse(localStorage.getItem(key));
                        obj.cid = key; //set this for local usage;

                        data.push(obj);
                    }
                }

                if (data.length === 0 && fillDummy) {
                    data = fillDummyData();
                }
            }

            return data;
        },

        removeModel : function (cid) {
            delete localStorage[cid];
        },

        getModel : function (cid) {
            //reject poorly formatted CIDs
            if (!KEY_TEST.test(cid)) { return false; }

            var m = localStorage[cid];

            if (!m) { return false; }

            return JSON.parse(m);
        },

        addModel : function(model) {
            var cid = generateCid();

            localStorage[cid] = JSON.stringify(model);
        }
    };
})(aKa);