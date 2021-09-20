const api_server = 'https://boiiii.team1540.org'

define({
    clock: async (name, clockingIn) => {
        let res = await fetch(api_server+'/clockapi/id?name='+encodeURIComponent(name), {
            method: 'GET'
        })
        let json = await res.json()
        let id = json.id;


        res = await fetch(api_server+'/clockapi/clock', {
            method: 'POST',
            mode: 'cors',
            body: {
                user: id,
                clockingIn: clockingIn
            }
        });
        json = await res.json();
        console.log(json);
    },
    cluckedIn: async ()=>{
        let res = await fetch(api_server+"timesheet/loggedin")
        let json = await res.json()
        return json;
    }
    // clockIn: async (name)=>{
    //    let res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    //        method:'PUT',
    //        mode:'cors',
    //        body:
    //    });
    //    let json = await res.json();
    //    console.log(json)
    // },
    // clockOut: (name)=>{
    //     fetch('https://team1540.org')
    // }
})