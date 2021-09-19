define({
    clock: async (name, clockingIn) => {
        let res = await fetch('/clockapi/id', {
            method: 'GET',
            body: {
                name: name
            }
        })
        let json = await res.json()
        let id = json.id;


        res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
            method: 'POST',
            mode: 'cors',
            body: {
                user: id,
                clockingIn: clockingIn
            }
        });
        json = await res.json();
        console.log(json);
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