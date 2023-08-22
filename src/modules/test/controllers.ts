import express, { Router } from "express";
import fs from "fs"

export const router = Router();


export const root = async function (
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    res.json({
      responseMessage: "Hola! soy una API de prueba!"
    })
}

export const showJson = async function (
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    const filePath = `./resources/test/${req.body.name}.json`;
    fs.readFile(filePath, (err, data) => {
      if(err) {
        res.json({
          statusCode: 500,
          responseMessage: err.message
        })
      }
      const textDecoder = new TextDecoder('utf-8');
      const decodedString = textDecoder.decode(data);

      res.json({
        statusCode: 200,
        responseMessage: "",
        responseData: JSON.parse(decodedString)
      })
    });

    // res.json({
    //   responseMessage: "Hola! soy una API de prueba!",
    //   responseData: jsonData
    // })
}

export const modifyJson = async function (
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const data = req.body.data;
      const filePath = `./resources/test/${req.body.name}.json`;
      const updateData = JSON.stringify(data, null, 2)
      fs.writeFile(filePath, updateData, "utf-8", err => {
        if(err) {
          console.log(err)
          res.json({
            statusCode: 500,
            responseMessage: err.message
          })
        }
        res.json({
          statusCode: 200,
          responseMessage: "se ha actualizado con exito"
        })
      })
    } catch (error) {
      res.json({
        statusCode: 500,
        responseMessage: error,
      })  
    }
}

export const deleteJson = async function (
  req: express.Request,
  res: express.Response
): Promise<any> {
  try {
    const referencePath = req.body.name
    const filePath = `./resources/test/${req.body.name}.json`;
    fs.unlink(filePath, (err) => {
      if (err) {
        res.json({
          statusCode: 500,
          responseMessage: err.message
        });
      }
    })

    res.json({
      statusCode: 200,
      responseMessage: "se ha borrado con exito"
    })

  } catch (error) {
    res.json({
      responseMessage: error,
    })
  }
}