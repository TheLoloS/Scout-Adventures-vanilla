(localStorage.getItem('startObjectWithMapData') === null) ? SetAndRead(): Read();

var abc;

function SetAndRead() {

    //Set object to letter add it

    const startObjectWithMapData = {
        'Map': {
            'Type': 'normal',
            'Buldings': [{
                    'Type': 'normal',
                    'nameBuldings': './models/tent_blend_11',
                    'lvl': 1,
                    'position': [-14, 0.5, -14],
                    'rotate': 2,
                    'update': false,
                    'updateTime': null

                },
                {
                    'Type': 'normal',
                    'nameBuldings': './models/tent_blend_11',
                    'lvl': 1,
                    'position': [-8, 0.5, -14],
                    'rotate': 1,
                    'update': false,
                    'updateTime': null
                },
                {
                    'Type': 'normal',
                    'nameBuldings': './models/tent_blend_11',
                    'lvl': 1,
                    'position': [-5, 0.5, -6],
                    'rotate': 1,
                    'update': false,
                    'updateTime': null
                }
            ]
        },
        'Data': {
            'nickname': 'TheLoloS'
        },
        'Resources': {
            'cones': 1000,
            'candy': 1000,
            'scouts': 10,
            'quartermaster': 2,
            'cadre': 1,
            'nurse': 1
        }
    };

    // Put the object into storage

    localStorage.setItem('startObjectWithMapData', JSON.stringify(startObjectWithMapData));

    // Retrieve the object from storage

    const retrievedStartObjectWithMapData = localStorage.getItem('startObjectWithMapData');
    // console.log('retrievedStartObjectWithMapData: ', JSON.parse(retrievedStartObjectWithMapData));
    abc = JSON.parse(retrievedStartObjectWithMapData);


}

function Read() {

    // Retrieve the object from storage

    const retrievedStartObjectWithMapData = localStorage.getItem('startObjectWithMapData');
    // console.log('retrievedStartObjectWithMapData: ', JSON.parse(retrievedStartObjectWithMapData));
    abc = JSON.parse(retrievedStartObjectWithMapData);
};
export default abc;