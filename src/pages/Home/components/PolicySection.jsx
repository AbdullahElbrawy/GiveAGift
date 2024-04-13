import CustomTextImgSection from "../../../components/CustomTextImgSection";

export default function PolicySection({ t }) {
	return (
		<CustomTextImgSection
			imgUrl="https://pouch.jumpshare.com/preview/nOJVvzIJqa8EQVS-Z45A8SC7pj7Jh-8x7nEfbAm0cb2YemiGEedLW24H06wVq8exG6VUx_dxiJyiSdRNGRUOF-WYXa5MoNBfFktDFUCm_2M"
			titlePrefix={t("home.policy.titlePrefix")}
			title={t("home.policy.title")}
			description={t("home.policy.description")}
		/>
	);
}
