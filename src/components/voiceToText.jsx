function countBefore() {
    let n = 0;
  
    function addCount() {
        n++;
      const count = document.getElementById("counter");
      count.innerHTML = n;
      console.log(n);
    }
  
    return (
      <>
        <p id="counter">0</p>
        <p><input type="button" value="+" onClick={addCount}/></p>
      </>
    );
  }
  
  export default countBefore;