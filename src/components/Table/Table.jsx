import React from 'react'

export default function Table() {
    const data = [
        {
        
          nama:'Frieska',
          rombel: 'PPLG XI-5',
          rayon: 'Cicurug 1'
        },
        {
        
          nama:'Aulia',
          rombel: 'PPLG XI-5',
          rayon: 'Ciawi 2'
        }
      ]
  return (
    <>
    <table border= "1px solid black">
        <thead>
            <tr>
                {
                    props.title.map((val,i) => (
                        <td>{val}</td>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            {props.data}
        </tbody>
    </table>
    </>
  )
}
 