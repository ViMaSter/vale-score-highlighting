# Maintained branches
## Branch formats
| Branch format                                | Type                                       | Description                                                                                                                                                                                                          |
| -------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `develop`                                    | [active<sup>?</sup>](#active-branches)     | The main development branch. <br /> `git push`-protected and modified via Pull Requests.                                                                                                                                    |
| `features/<issueid>-<human-readable-suffix>` | [active<sup>?</sup>](#active-branches)     | Created from develop and merged back into develop. <br /> Used to develop new features. <br /> `issueid` must match [the related GitHub Issue](https://github.com/Studio-Lovelies/GG-JointJustice-Unity/issues). |
| `bugfix/<issueid>-<human-readable-suffix>`   | [active<sup>?</sup>](#active-branches)     | Created from develop and merged back into develop. <br /> Used to fix bugs. <br /> `issueid` must match [the related GitHub Issue](https://github.com/Studio-Lovelies/GG-JointJustice-Unity/issues).             |
| `master`                                     | ???                                        | ???                                                                                                                                                                                                                  |
| `release/case<last-case-number>`             | [archival<sup>?</sup>](#archival-branches) | [Matches itch.io releases.](https://studiolovelies.itch.io/ggjj-lua) Considered read-only.                                                                                                                           |
| `baby`                                       | [archival<sup>?</sup>](#archival-branches) | Oh no, the secret DLC!                                                                                                                                                                                               |

Other branch prefixes may be used, if the change doesn't related to a GitHub Issue.

## Branch types
### Active branches
- **Temporary**
- Should have a related **Pull Request** - mark as draft when work-in progress or set as ready for review
- Safe to delete after merging the Pull Request
- Cleaned up, if no Pull Request exists for it

### Archival branches
- **Permanent**
- Created for each itch.io deployment

<!--- dirty-little workaround to make sure the page is tall enough so that the branch type anchors work properly (otherwise browsers might not be able to scroll far enough) --->
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />