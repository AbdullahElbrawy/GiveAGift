import { Avatar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CardPreview({ cardSitting, back, ShowBrand }) {
  const { t } = useTranslation();
  const fontClassName =
    cardSitting.font === "Noto Sans Arabic"
      ? "!font-notoSansArabic"
      : cardSitting.font === "Amiri"
      ? "!font-amiri"
      : cardSitting.font === "Cairo"
      ? "!font-cairo"
      : "";
   const navToUrl =(des)=>{
    window.location.href = des
   }
  return (
    <div className="w-min-[280px] lg:w-[450px]   w-full ">
      <figure
        className="relative  flex justify-center shrink-0 mx-auto   h-[180px] md:h-[240px] md:w-[450px]  rounded-2xl  overflow-hidden transition-colors"
        style={{ backgroundColor: cardSitting.color }}
      >
        <div
          className={"   lg:w-[450px] mx-auto w-full  w-min-[280px]    md:h-[240px]   h-[180px] "}
          style={{ position: "relative", maxWidth: "480px" }}
        >
          {!back ? (
            <>
              <div className="absolute min-w-[280px]     mx-auto  ">
                {cardSitting.shape ? (
                  <img
                    src={cardSitting.shape}
                    height={200}
                    alt="gift card"
                    className="rounded-2xl  object-fill mx-auto  w-full   lg:w-[450px]     md:h-[240px]   h-[180px]  object-fill absolute  transition duration-500 group-hover:opacity-0 group-hover:scale-75 z-10"
                  />
                ) : null}
              </div>

              <div className={`absolute top-2 mix-blend-colorDodge  right-2 z-10`}>
                {cardSitting.brand.logoName ? (
                  <img
                    src={cardSitting.brand.logoWithoutBackground}
                    alt={`${cardSitting.brand.logoName} logo`}
                    width={65}
                    height={65}
                    className="rounded-2xl object-fill mix-blend-colorDodge  transition duration-500 group-hover:opacity-0 group-hover:scale-75 z-10"
                  />
                ) : null}
              </div>
            </>
          ) : (
            <div
              className="flex flex-col justify-center items-center text-center   p-4 gap-2 h-full"
              style={{ color: cardSitting.textColor }}
            >
              <Typography
                variant="h5"
                component="p"
                className={`${fontClassName} word-wrap   p-4 transition-colors`}
                style={{overflowWrap: 'anywhere'}}
              >
                {cardSitting.message}
              </Typography>
              <Typography
                variant="h6"
                component="p"
                className={`${fontClassName}  p-4 transition-colors`}
              >
                {cardSitting.price} {t("currency")}
              </Typography>
              <div className="absolute bottom-4 left-4">
                <img src="https://i.imgur.com/wkyCwby.png" alt="logo" width={100} />
              </div>
            </div>
          )}
        </div>
      </figure>

      {ShowBrand && (
        <div className="flex justify-between items-center w-full px-5 mt-4">
          <h3 className="flex items-center gap-2 text-xl">
            <Avatar
              src={cardSitting.logoImage ? cardSitting.logoImage: cardSitting.brand.logoWithoutBackground}
              alt={cardSitting.brand.logoName}
              className="[&_img]:object-contain object-contain cursor-pointer"
              sx={{ width: 60 , height: 60 }}
              onClick={()=>navToUrl(cardSitting.brand.brandUrl)}
            />
            {cardSitting.brand.logoName}
          </h3>
          <p className="text-xl">
            {cardSitting.price} {t("currency")}
          </p>
        </div>
      )}

      {/* unique code */}
      {cardSitting.uniqueCode && (
        <div className="flex justify-between items-center w-full px-5 mt-4">
          <p className="text-xl">{cardSitting.uniqueCode}</p>
          <p
            className={`${
              cardSitting.isPaid ? "text-green-500" : "text-red-500"
            }`}
          >
            {cardSitting.isPaid ? t("preview.ready") : t("preview.notReady")}
          </p>
        </div>
      )}
    </div>
  );
}
