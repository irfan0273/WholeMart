const verfiyEmailTemplate =({name,url})=>{
    return`
    <p> Dear ${name} </p>
   <p> Thank you for registering Wholemart </p>
   <a href=${url} style="background-color: #4CAF50; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">
   Verify Email
   </a>
    `
}
export default verfiyEmailTemplate