import React from "react";
import { Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ReadyCardPreview({ card, back }) {
  const { t } = useTranslation();
  React.useEffect(() => {
    console.log(card);
  }, []);
const goToSite = (des)=>{
  window.location.href=des
}
  return (
    <div className="">
     
        <img
          src={back ? card.cardBack : card.cardFront}
          alt="card"
        className="object-cover rounded-2xl mx-auto   w-max-[280px] h-[180px] md:h-[240px] md:w-[450px]  "
        />
     

      <div className="flex justify-between items-center sm:flex-row  gap-3  flex-col w-full px-5 mt-4">
        <h3 className="flex items-center gap-2 text-xl">
          <Avatar
            src={card.logoImage}
            alt={card.logoImage}
            className="[&_img]:object-contain cursor-pointer"
            sx={{ width: 56, height: 56 }}
            onClick={()=>goToSite(card.brandUrl)}
          />
          {card.brand.logoName}
        </h3>
        {/* <div className="mt-4"> */}
        <p className="text-xl">
          {card.price} {t("currency")}
        </p>

        <p className="">{card.uniqueCode}</p>
        <p className={`${card.ready ? "text-green-500" : "text-red-500"}`}>
          {card.ready ? t("preview.ready") : t("preview.notReady")}
        </p>
        {/* </div> */}
      </div>
    </div>
  );
}
