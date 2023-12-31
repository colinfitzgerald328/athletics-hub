import React from "react";
import * as API from "src/app/api/api.js";
import AthleteResults from "./1_AthleteResults";
import SearchBar from "./2_SearchBar";
import Similar from "./3_Similar";
import Skeleton from "@mui/material/Skeleton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import styles from "./desktop.module.css";

export default class DesktopVersion extends React.Component {
  constructor(props) {
    super(props);
  }

  separateSentencesIntoParagraphs(text) {
    if (!text) {
      return "";
    }
    // Split the text into sentences using regular expressions.
    const sentences = text.split(". ");

    // Join the sentences to create separate paragraphs.
    const paragraphs = sentences.map((sentence, index) => (
      <p key={index} className={styles.sentence}>
        {index === sentences.length - 1 ? sentence : sentence + "."}
      </p>
    ));

    // Join the paragraphs to create the final result.
    return paragraphs;
  }

  normalizeName(name) {
    const nameParts = name.toLowerCase().split(" ");
    const normalizedParts = nameParts.map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    });
    return normalizedParts.join(" ");
  }

  formatAccolade(accolade) {
    const parts = accolade.split("x");
    const count = parts[0];
    const name = parts[1];
    return (
      <div className={styles.accoladeContainer}>
        <b style={{ marginRight: "5px" }}>{count}x</b> {name}
      </div>
    );
  }

  render() {
    if (this.props.athlete.length === 0) {
      return <div>Loading...</div>;
    } else if (this.props.athlete) {
      const firstThreeAccomplishments =
        this.props.athlete.accomplishments.slice(0, 3);
      var twitterUrl;
      var socialMediaUrls = this.props.athlete.social_urls;
      for (var i = 0; i < socialMediaUrls.length; i++) {
        if (socialMediaUrls[i].twitter_url) {
          twitterUrl = socialMediaUrls[i].twitter_url;
          break;
        }
      }
      var instagramUrl;
      for (var i = 0; i < socialMediaUrls.length; i++) {
        if (socialMediaUrls[i].instagram_url) {
          instagramUrl = socialMediaUrls[i].instagram_url;
          break;
        }
      }
      return (
        <div className={styles.main}>
          <div className={styles.pageLabel}>athletics hub</div>
          <div className={styles.panelHolder}>
            <div className={styles.mainBackground}>
              <div className={styles.leftItemsHolder}>
                <SearchBar
                  setAthlete={this.props.setAthlete}
                  athlete={this.props.athlete}
                />
                <div className={styles.mainText}>
                  <div className={styles.container}>
                    <div className={styles.mainTitle}>
                      <div>{this.props.athlete.full_name}</div>
                      <div className={styles.mainEvents}>
                        {this.props.athlete.disciplines}
                      </div>
                    </div>
                    <div className={styles.rightContainer}>
                      <div
                        onClick={() =>
                          window.open(this.props.athlete.wikipedia_url)
                        }
                        className={styles.openLink}
                      >
                        READ MORE
                      </div>
                      <div className={styles.socialIconHolder}>
                        {twitterUrl && (
                          <div className={styles.socialIconHolder}>
                            <img
                              onClick={() => window.open(twitterUrl)}
                              className={styles.image}
                              src="https://worldathletics.org/static/twitter.svg"
                            />
                          </div>
                        )}
                        {instagramUrl && (
                          <div className={styles.socialIconHolder}>
                            <img
                              onClick={() => window.open(instagramUrl)}
                              className={styles.image}
                              src="https://worldathletics.org/static/instagram.svg"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={styles.mainSummary}>
                    <div className={styles.leftItemsHolder}>
                      <div className={styles.summaryLabel}>
                        <AttachFileIcon></AttachFileIcon> NOTEBOOK
                      </div>
                      <div className={styles.summary}>
                        {this.separateSentencesIntoParagraphs(
                          this.props.athlete.summary,
                        )}
                      </div>
                    </div>
                    <div className={styles.rightItemsHolder}>
                      <div className={styles.closestCompetitors}>
                        <div className={styles.label}>
                          <LocalFireDepartmentIcon
                            sx={{ margin: 0, padding: 0 }}
                          ></LocalFireDepartmentIcon>
                          COMPETITION
                        </div>
                        <div
                          className={styles.competitorsWithSlightlyLessMargin}
                        >
                          {this.props.loadingNewAthlete ? (
                            <div>
                              <Skeleton animation="wave"/>
                              <Skeleton animation="wave"/>
                              <Skeleton animation="wave"/>
                            </div>
                          ) : (
                            this.props.athlete.top_competitors_with_reference.map(
                              (competitor, index) => (
                                <div
                                  key={index}
                                  className={
                                    competitor.athlete_id
                                      ? styles.competitor
                                      : styles.competitorNoLink
                                  }
                                  onClick={() =>
                                    this.props.setAthleteFromTopCompetitors(
                                      competitor.athlete_id,
                                    )
                                  }
                                >
                                  {index + 1}.{" "}
                                  <b style={{ marginLeft: "5px" }}>
                                    {this.normalizeName(
                                      competitor.athlete_name,
                                    )}
                                  </b>
                                </div>
                              ),
                            )
                          )}
                        </div>
                      </div>
                      <div className={styles.closestCompetitors}>
                        <div className={styles.label}>PERSONAL BESTS</div>
                        <div className={styles.competitors}>
                          {this.props.loadingNewAthlete ? (
                            <div>
                             <Skeleton animation="wave"/>
                             <Skeleton animation="wave"/>
                             <Skeleton animation="wave"/>
                            </div>
                          ) : (
                            this.props.athlete_pbs.map((data, index) =>
                              data.length === 0 ? null : (
                                <div key={index} className={styles.pbHolder}>
                                  <div className={styles.pbMark}>
                                    {data.result}
                                  </div>
                                  <div className={styles.pbEvent}>
                                    {data.discipline}
                                  </div>
                                </div>
                              ),
                            )
                          )}
                        </div>
                      </div>
                      <div className={styles.closestCompetitors}>
                        {firstThreeAccomplishments.length === 0 ? null : (
                          <>
                            <div className={styles.label}>ACCOLADES</div>
                            <div className={styles.competitors}>
                              {this.props.loadingNewAthlete ? (
                                <div>
                               <Skeleton animation="wave"/>
                               <Skeleton animation="wave"/>
                               <Skeleton animation="wave"/>
                                </div>
                              ) : (
                                firstThreeAccomplishments.map(
                                  (accolade, index) => (
                                    <div
                                      key={index}
                                      className={styles.accoladesBox}
                                    >
                                      {this.formatAccolade(accolade)}
                                    </div>
                                  ),
                                )
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mainImage}>
                <img
                  className={styles.athleteImage}
                  src={this.props.athlete.hq_image_url}
                />
                <AthleteResults
                  athlete={this.props.athlete_data}
                  viewingAthlete={this.props.athlete}
                  loadingNewAthlete={this.props.loadingNewAthlete}
                />
              </div>
            </div>
            <div className={styles.suggestionPanel}>
              <Similar
                similar_athletes={this.props.similar_athletes}
                setAthlete={this.props.setAthlete}
                loadingNewAthlete={this.props.loadingNewAthlete}
              ></Similar>
            </div>
          </div>
        </div>
      );
    }
  }
}
