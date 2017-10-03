export default () => (
  <div>
   <style jsx global>{`
      body {
        background: green
      }
    `}</style>
    before
    <p>only this paragraph will get the style :)</p>
    after
    { /* you can include <Component />s here that include
         other <p>s that don't get unexpected styles! */ }

    <style jsx>{`
      p {
        color: red;
      }
    `}</style>
  </div>
)