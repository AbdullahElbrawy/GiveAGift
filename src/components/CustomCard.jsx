import { CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomCard({ title, description, front, back, type }) {
  return (
    
    <div className="text-center !rounded-2xl">
      <style>
        {`
          @media (max-width: 599px) {
            .card {
             margin:auto;
             max-width:380px
            }
          }
          @media (max-width: 320px) {
            .card {
             margin:auto;
             max-width:260px
            }
          }
        `}
      </style>

      <div className="text-center mx-auto">
        <Link to={`${type === "custom" ? "/custom-gift-card" : "gift-card"}`} className="flex justify-center">
          <div
            className="relative group card flex justify-center  md:h-[240px]   h-[180px] md:w-[450px]  "
           
          >
            <div
              style={{
                position: "relative",
         
                
              
              }}
              className="min-w-[280px] w-[100%]"
            >
              {" "}
              {/* Aspect ratio container */}
              <img
                className="rounded-2xl object-fill transition m-auto duration-500 group-hover:opacity-0 group-hover:scale-75 z-10"
                src={front}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                 
                }}
                alt="card front face"
              />
             
              <img
                className="rounded-2xl object-fill opacity-0  m-auto scale-x-75 transition group-hover:opacity-100 group-hover:scale-x-100"
                src={back}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
               
                }}
                alt="card back face"
              />
            </div>
          </div>
        </Link>

        <CardContent>
          <Link to={`${type === "custom" ? "/custom-gift-card" : "gift-card"}`}>
            <Typography variant="h4" className="text-primary-700 !mb-1">
              {title}
            </Typography>
          </Link>
          <Typography>{description}</Typography>
        </CardContent>
      </div>
    </div>
  );
}
