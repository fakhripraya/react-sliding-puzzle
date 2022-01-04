import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Board from "./Board";
import { updateURLParameter } from "./helpers"
import config from './config.json'
import { useTable } from 'react-table'

function App() {

  const socketRef = useRef()
  const modalRef = useRef(null)
  const [imgUrl, setImgUrl] = useState("")
  const [stage, setStage] = useState(0)
  const [stageBefore, setStageBefore] = useState(0)
  const [fromGoBack, setFromGoBack] = useState(false)
  const [withTime, setWithTime] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("img")) {
      setImgUrl(urlParams.get("img"))
    }
  }, [])

  useEffect(() => {

    // // Socket initialization
    socketRef.current = io(config.url + config.port, {
      withCredentials: true,
      upgrade: false,
      transports: ['websocket']
    });

    socketRef.current.on("connect", () => {
      console.log('connected')
    });

    return () => {
      socketRef.current.disconnect();
      console.log('disconnected')
    }

  }, []);

  const data = React.useMemo(
    () => [
      {
        col1: '1',
        col2: 'You need to join here dog',
        col3: 'Free Play',
        col4: '1/2',
        col5: 'Hundreds',
      },
      {
        col1: '2',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
      },
      {
        col1: '3',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
      },
      {
        col1: '4',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
      },
      {
        col1: '5',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
      },
      {
        col1: '6',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
      },
      {
        col1: '7',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
      },
      {
        col1: '8',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
      },
      {
        col1: '9',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
      },
      {
        col1: '10',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
      }
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Description',
        accessor: 'col2',
      },
      {
        Header: 'Game Mode',
        accessor: 'col3',
      },
      {
        Header: 'Capacity',
        accessor: 'col4',
      },
      {
        Header: 'Room Maker',
        accessor: 'col5',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  const handleImageChange = (image) => {
    setImgUrl(image)
    window.history.replaceState("", "", updateURLParameter(window.location.href, "img", image))
  }

  const handleStageChange = (newstage, from) => {
    setStageBefore(stage)
    setStage(newstage)
    console.log(from)
    setFromGoBack(from)
  }

  const handleJoinRoom = () => { }

  const handleCreateRoom = () => { }

  return (
    <div className="App">
      <h1 style={{ color: '#000', fontSize: 72 }}>H<span style={{ fontSize: 60 }} className="rotated">A</span>PEBEAST GAME</h1>
      <h4 style={{ color: '#000', marginTop: 0, fontSize: 26 }}>SIMPLE PUZZLE</h4>
      <Board fromGoBack={fromGoBack} withTime={withTime} stage={stage} setStage={(x, y) => { handleStageChange(x, y) }} imgUrl={imgUrl} />
      <div style={{ display: 'flex', flexDirection: 'column', background: '#fff', width: '100%', height: 'auto', borderTop: '1px solid #000', marginTop: 'auto', marginBottom: 0, textAlign: 'center', justifySelf: 'center', alignSelf: 'center' }}>
        <p style={{ display: 'flex', color: '#000', marginBottom: 0, fontSize: 22, textAlign: 'center', justifySelf: 'center', alignSelf: 'center' }}>Created By</p>
        <p style={{ display: 'flex', color: '#000', marginTop: 0, fontSize: 18, textAlign: 'center', justifySelf: 'center', alignSelf: 'center' }}>HUNDREDS#3501 / HUNDREDS of HAPE {'&'} kingdoob#0992 / ✨Kingdoob | HAPE</p>
      </div>
      {/* <input value={imgUrl} onChange={handleImageChange} /> */}
      <div ref={modalRef} style={{ display: stage > (config["menu-stage"] - 1) ? 'none' : 'block' }} className="modal">
        <div className={stage === 2 ? "modal-body-room-list" : "modal-body"}>
          {
            stage === 0 ?
              (<div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignContent: 'center', height: '100%', padding: 20 }}>
                <h1 style={{ color: '#FFF', fontSize: 56, marginBottom: 25 }}>PLAY NOW</h1>
                <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                  <button onClick={() => { handleStageChange(1, false); setWithTime(false) }} style={{ width: 200, height: 40, background: '#CD0000', border: 'none', marginRight: 20 }} ><span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Free Play</span></button>
                  <button onClick={() => { handleStageChange(2, false); setWithTime(false) }} style={{ width: 200, height: 40, background: '#CD0000', border: 'none', marginRight: 20 }} ><span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Online Play</span></button>
                  <button onClick={() => { handleStageChange(1, false); setWithTime(true) }} style={{ width: 200, height: 40, background: '#CD0000', border: 'none' }} ><span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Time Trial</span></button>
                </div>
              </div>)
              : stage === 1 ?
                (<div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignContent: 'center', height: '100%', padding: '0px 20px 20px 20px' }}>
                  <h1 style={{ color: '#FFF', fontSize: 56, marginBottom: 25 }}>PICK IMAGE</h1>
                  <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                    <div onClick={() => { handleStageChange(config["menu-stage"], false); handleImageChange('https://cdn.discordapp.com/attachments/918200816760938537/925966836523237417/00zerso1c.jpg') }} className="box-image" style={{ marginRight: 15 }} ><img className="box-image" src="https://cdn.discordapp.com/attachments/918200816760938537/925966836523237417/00zerso1c.jpg" alt="1" /></div>
                    <div onClick={() => { handleStageChange(config["menu-stage"], false); handleImageChange("https://cdn.discordapp.com/attachments/918200816760938537/925966835986354176/00zerso1a.jpg") }} className="box-image" style={{ marginRight: 15 }} ><img className="box-image" src="https://cdn.discordapp.com/attachments/918200816760938537/925966835986354176/00zerso1a.jpg" alt="1" /></div>
                    <div onClick={() => { handleStageChange(config["menu-stage"], false); handleImageChange("https://cdn.discordapp.com/attachments/918200816760938537/925966836275748965/00zerso1d.jpg") }} className="box-image" style={{ marginRight: 15 }} ><img className="box-image" src="https://cdn.discordapp.com/attachments/918200816760938537/925966836275748965/00zerso1d.jpg" alt="1" /></div>
                    <div onClick={() => { handleStageChange(config["menu-stage"], false); handleImageChange("https://cdn.discordapp.com/attachments/918200816760938537/925966836808445952/00zerso1b.jpg") }} className="box-image" ><img className="box-image" src="https://cdn.discordapp.com/attachments/918200816760938537/925966836808445952/00zerso1b.jpg" alt="1" /></div>
                  </div>
                </div>)
                : stage === 2 ? (
                  <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignContent: 'center', height: '100%' }}>
                    <h1 style={{ color: '#FFF', fontSize: 56, marginBottom: 25 }}>ROOM LIST</h1>
                    <h4 style={{ color: '#fff', marginTop: 0, fontSize: 20 }}>Now you can play with your friend dog</h4>
                    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
                      <thead>
                        {headerGroups.map(headerGroup => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                              <th
                                {...column.getHeaderProps()}
                                style={{
                                  borderBottom: 'solid 3px red',
                                  background: 'aliceblue',
                                  color: 'black',
                                  fontWeight: 'bold',
                                }}
                              >
                                {column.render('Header')}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                          prepareRow(row)
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map(cell => {
                                return (
                                  <td
                                    {...cell.getCellProps()}
                                    style={{
                                      padding: '10px',
                                      border: 'solid 1px gray',
                                      color: 'black',
                                      background: 'papayawhip',
                                    }}
                                  >
                                    {cell.render('Cell')}
                                  </td>
                                )
                              })}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginTop: '30px' }}>
                      <button onClick={() => { handleStageChange(1, false); setWithTime(false) }} style={{ width: 200, height: 40, background: '#CD0000', border: 'none', marginRight: 20 }} ><span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Join Room</span></button>
                      <button onClick={() => { handleStageChange(3, false); setWithTime(false) }} style={{ width: 200, height: 40, background: '#CD0000', border: 'none', marginRight: 20 }} ><span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Create Room</span></button>
                      <button onClick={() => { handleStageChange(stageBefore, true); setWithTime(withTime) }} style={{ width: 200, height: 40, background: '#CD0000', border: 'none', marginRight: 20 }} ><span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Go Back</span></button>
                    </div>
                  </div>
                ) : null
          }
        </div>
      </div>
    </div >
  );
}

export default App;
