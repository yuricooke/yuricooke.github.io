/*
  --------------------------------------------------------------------------------------
METHOD: GET  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/cores';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.cores.forEach(item => insertList(item.nome, item.hex))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()


/*
  --------------------------------------------------------------------------------------
  METHOD: POST
  --------------------------------------------------------------------------------------
*/

const postItem = async (colorName, colorValue) => {
    const formData = new FormData();
    formData.append('nome', colorName);
    formData.append('hex', colorValue);
  
    let url = 'http://127.0.0.1:5000/cor';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }


/*
  --------------------------------------------------------------------------------------
  METHOD: DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/cor?nome=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  